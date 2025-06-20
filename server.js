const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/userAuth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  const { userID, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ userID });
    if (existingUser) {
      return res.status(400).json({ message: "User ID already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userID, email, password: hashedPassword });
    await newUser.save();

    console.log("✅ New user saved:", newUser.userID);
    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  const { userID, password } = req.body;
  try {
    console.log("🔐 Login attempt:", userID);
    const user = await User.findOne({ userID });

    if (!user) {
      console.log("❌ No user found with ID:", userID);
      return res.status(401).json({ message: "Invalid ID or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch for:", userID);
      return res.status(401).json({ message: "Invalid ID or password" });
    }

    console.log("✅ Login successful for:", userID);
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

// ✅ Forgot Password Route
app.post("/forgot-password", async (req, res) => {
  const { userID, email } = req.body;
  try {
    const user = await User.findOne({ userID, email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-app-password",
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    await transporter.sendMail({
      from: '"Support" <your-email@gmail.com>',
      to: user.email,
      subject: "Password Reset Link",
      html: `<p>Click to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    });

    console.log("📧 Reset link sent to:", user.email);
    res.json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error("❌ Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Reset Password Route
app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    console.log("✅ Password updated for:", user.userID);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Reset Password Error:", error);
    res.status(500).json({ message: "Reset failed" });
  }
});

// ✅ Contact Message Route
const messageSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

app.post("/api/message", async (req, res) => {
  const { userID, message } = req.body;
  if (!userID || !message) {
    return res.status(400).json({ message: "userID and message are required" });
  }

  try {
    const newMessage = new Message({ userID, message });
    await newMessage.save();
    console.log("✅ Message saved from", userID);
    res.json({ message: "Message received" });
  } catch (error) {
    console.error("❌ Failed to save message:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Cart Save Route
const cartSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      size: String,
      quantity: { type: Number, default: 1 },
    },
  ],
  savedAt: { type: Date, default: Date.now },
});
const Cart = mongoose.model("Cart", cartSchema);

app.post("/api/cart/save", async (req, res) => {
  const { userID, items } = req.body;

  if (!userID || !items || !Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid cart data" });
  }

  try {
    await Cart.findOneAndUpdate(
      { userID },
      { items, savedAt: new Date() },
      { upsert: true, new: true }
    );

    console.log("✅ Cart saved for", userID);
    res.json({ message: "Cart saved successfully" });
  } catch (error) {
    console.error("❌ Failed to save cart:", error);
    res.status(500).json({ message: "Failed to save cart" });
  }
});

// ✅ Newsletter Route
const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});
const Newsletter = mongoose.model("Newsletter", newsletterSchema);

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const exists = await Newsletter.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already subscribed" });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    console.log("✅ New subscriber:", email);
    res.json({ message: "Subscription successful" });
  } catch (error) {
    console.error("❌ Subscription error:", error);
    res.status(500).json({ message: "Subscription failed" });
  }
});

// ✅ Start Server
const PORT = 5009;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
