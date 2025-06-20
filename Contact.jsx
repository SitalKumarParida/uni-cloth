import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Contact.css"; // optional: for external CSS

function Contact() {
  const { userID } = useParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return alert("Please enter a message!");

    try {
      await axios.post("http://localhost:5009/api/message", {
        userID,
        message,
      });
      setStatus("✅ Message sent successfully!");
      setMessage("");
    } catch (err) {
      setStatus("❌ Failed to send message");
      console.error(err);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2>📩 Contact Customer Support</h2>
        <p>
          Have any questions, feedback or concerns? Feel free to send us a
          message and we’ll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <textarea
            rows="6"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button type="submit">Send Message</button>
        </form>

        {status && <p className="contact-status">{status}</p>}
      </div>
    </div>
  );
}

export default Contact;
