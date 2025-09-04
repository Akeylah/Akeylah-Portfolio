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
  chatbox.classList.add("hidden");
});

// Send message on button click or Enter
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const msg = input.value.trim();
  if (msg === "") return;

  // Show user message
  appendMessage(msg, "user");
  input.value = "";

  // First check local keywords
  const localReply = handleUserInput(msg);
  if (localReply) {
    setTimeout(() => appendMessage(localReply, "bot"), 600);
    return;
  }

  // Otherwise → send to AI backend
  appendMessage("🤖 ...typing", "bot", true); // typing indicator
  try {
    const response = await fetch("/api/chat", {   // ✅ relative path (works locally + deployed)
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });

    const data = await response.json();

    removeTypingIndicator();
    appendMessage(data.reply, "bot");
  } catch (err) {
    console.error("AI error:", err);
    removeTypingIndicator();
    appendMessage(fakeReply(), "bot");
  }
}

function appendMessage(text, sender, typing = false) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  if (typing) msgDiv.classList.add("typing");

  msgDiv.innerHTML = `
    <span>${text}</span>
    <div class="meta">${getTime()} ✓✓</div>
  `;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

function removeTypingIndicator() {
  const typing = messages.querySelector(".message.bot.typing");
  if (typing) typing.remove();
}

function getTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

// --- Responses ---
const responses = {
  joke: "😂 Why do programmers prefer dark mode? Because light attracts bugs!",
  skills: "💻 My main skills are Html, CSS, Javascript, c++ and SQL.",
  hobbies:
    "🎨 Outside of coding, I love painting, reading, gaming, photography, writing poetry and gardening.",
  career:
    "🚀 My goal is to become a web/graphic designer or data engineer.",
  funfact: "✨ Fun fact: I originally wanted to be a robotics engineer. I'll reach that goal one day, always dream big!",
  tech: "🛠️ This portfolio was built with advanced HTML, CSS, and JavaScript and a lot of debugging 😂!",
  inspiration:
    "🌟 I get inspired by personal curiosity. I like to use my creative gift and build extraordinary things",
  contact: "📬 You can reach me at: akeylahh356@email.com",
};

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

function fakeReply() {
  const replies = [
    "🤔 I’m not sure about that. Try asking about *projects, resume, contact, skills, or hobbies*.",
    "💡 You can ask me things like 'Show me your projects' or 'Tell me a fun fact'.",
    "👋 I can share info about my portfolio, career goals, hobbies, and more. What interests you?",
    "✨ Not sure what to ask? Click one of the buttons above ⬆️.",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

// Starter buttons
if (starterOptions) {
  starterOptions.addEventListener("click", function (e) {
    if (e.target.classList.contains("starter-btn")) {
      const option = e.target.dataset.option;
      appendMessage(e.target.textContent, "user");

      setTimeout(() => {
        appendMessage(
          responses[option] || "Hmm, I don’t have a response for that yet.",
          "bot"
        );
      }, 600);
    }
  });
}
