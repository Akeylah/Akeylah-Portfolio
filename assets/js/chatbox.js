const chatToggle = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const sendBtn = document.getElementById("sendMessage");
const input = document.getElementById("chatMessage");
const messages = document.querySelector(".chat-messages");
const starterOptions = document.querySelector(".starter-options");

// Toggle chatbox
chatToggle.addEventListener("click", () => {
  chatbox.classList.toggle("hidden");
});

// Send message on button click or Enter
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

function sendMessage() {
  const msg = input.value.trim();
  if (msg === "") return;

  // User message
  appendMessage(msg, "user");

  input.value = "";

  // Bot reply (check keywords first, fallback to fakeReply)
  setTimeout(() => {
    const reply = handleUserInput(msg) || fakeReply();
    appendMessage(reply, "bot");
  }, 800);
}

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.innerHTML = `
    <span>${text}</span>
    <div class="meta">${getTime()} ✓✓</div>
  `;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

function getTime() {
  const now = new Date();
  return now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
}

// --- Responses ---
const responses = {
  projects: "Here are some of my top projects: 🚀 [Project 1] [Project 2]",
  resume: "📄 You can view my resume here: [Resume Link]",
  contact: "📬 You can reach me via the contact form or email: me@example.com",
  joke: "😂 Why do programmers prefer dark mode? Because light attracts bugs!",
  skills: "💻 My main skills are JavaScript, React, CSS, and Python."
};

// Handle free-text keywords
function handleUserInput(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("project")) return responses.projects;
  if (msg.includes("resume") || msg.includes("cv")) return responses.resume;
  if (msg.includes("contact")) return responses.contact;
  if (msg.includes("joke")) return responses.joke;
  if (msg.includes("skills")) return responses.skills;
  return null; // fallback handled by fakeReply
}

// Fake fallback responses
function fakeReply() {
  const replies = [
    "Hi there! 👋",
    "Thanks for checking my portfolio!",
    "Would you like to see my projects?",
    "I can also help you contact me."
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// --- Handle starter buttons ---
if (starterOptions) {
  starterOptions.addEventListener("click", function(e) {
    if (e.target.classList.contains("starter-btn")) {
      const option = e.target.dataset.option;
      
      // Show button text as user message
      appendMessage(e.target.textContent, "user");

      // Bot reply
      setTimeout(() => {
        appendMessage(responses[option] || "Hmm, I don’t have a response for that yet.", "bot");
      }, 600);
    }
  });
}
