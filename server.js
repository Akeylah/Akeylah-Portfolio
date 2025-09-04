// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { CohereClient } = require("cohere-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Cohere client with API key
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// Route for chat
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Use Cohere Chat endpoint
    const response = await cohere.chat({
      model: "command-r",
      message: userMessage,
    });

    res.json({
      reply: response.text?.trim() || "⚠️ Sorry, I didn’t understand that.",
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
