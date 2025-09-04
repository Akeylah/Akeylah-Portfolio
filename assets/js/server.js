// server.js
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Route for chat
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "command-r",  // ✅ free-tier conversational model
        message: userMessage
      })
    });

    const data = await response.json();
    res.json({
      reply: data.text?.trim() || "⚠️ Sorry, I didn’t understand that."
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ reply: "⚠️ Server error talking to AI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
