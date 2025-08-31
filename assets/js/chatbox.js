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

const chatClose = document.getElementById("chat-close");

chatClose.addEventListener("click", () => {
  chatbox.classList.add("hidden"); // just hides it again
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
  joke: "😂 Why do programmers prefer dark mode? Because light attracts bugs!",
  skills: "💻 My main skills are JavaScript, React, CSS, and Python.",
  hobbies: "🎨 Outside of coding, I love [your hobbies here—like painting, reading, gaming, photography].",
  career: "🚀 My goal is to [your career goals here—like become a full-stack developer, work in AI, or freelance].",
  funfact: "✨ Fun fact: [add something unique about yourself here].",
  tech: "🛠️ This portfolio was built with HTML, CSS, and JavaScript! I wanted it to be clean, interactive, and mobile-friendly.",
  inspiration: "🌟 I get inspired by [famous designers, coders, or personal motivations—like creativity, solving problems, or helping people].",
contact: "📬 You can reach me at: your@email.com or via the Contact form below.",

};
// Handle free-text keywords
function handleUserInput(msg) {
  msg = msg.toLowerCase();
  let replies = [];

  if (msg.includes("contact") || msg.includes("email")) replies.push(responses.contact);
  if (msg.includes("joke") || msg.includes("funny")) replies.push(responses.joke);
  if (msg.includes("skills") || msg.includes("tech stack")) replies.push(responses.skills);
  if (msg.includes("hobby") || msg.includes("interests")) replies.push(responses.hobbies);
  if (msg.includes("career") || msg.includes("goal")) replies.push(responses.career);
  if (msg.includes("fun fact") || msg.includes("fact")) replies.push(responses.funfact);
  if (msg.includes("tech") || msg.includes("built")) replies.push(responses.tech);
  if (msg.includes("inspiration") || msg.includes("inspire")) replies.push(responses.inspiration);

  return replies.length > 0 ? replies.join("\n\n") : null;
}


// Smarter fallback when no keywords match
function fakeReply() {
  const replies = [
    "🤔 I’m not sure about that. Try asking about *projects, resume, contact, skills, or hobbies*.",
    "💡 You can ask me things like 'Show me your projects' or 'Tell me a fun fact'.",
    "👋 I can share info about my portfolio, career goals, hobbies, and more. What interests you?",
    "✨ Not sure what to ask? Click one of the buttons above ⬆️."
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
