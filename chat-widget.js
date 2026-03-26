(function () {
  "use strict";

  const API_URL = "https://stevesitpro-chatbot.vercel.app/api/chat";
  const CONSULT_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLScGj_hocIEBDevsfLjQlSHTX74xX78hrLmz2TUejaFRTTBkvQ/viewform?usp=header";

  let messages = [];
  let isOpen = false;
  let isLoading = false;

  // Create styles
  const style = document.createElement("style");
  style.textContent = `
    #sitp-chat-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%;
      background: #10b981; border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(16,185,129,0.4);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    #sitp-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(16,185,129,0.5); }
    #sitp-chat-btn svg { width: 26px; height: 26px; fill: #020817; }

    #sitp-chat-panel {
      position: fixed; bottom: 92px; right: 24px; z-index: 9999;
      width: 380px; max-height: 520px; border-radius: 1.25rem;
      background: #0f172a; border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 12px 48px rgba(0,0,0,0.5);
      display: none; flex-direction: column; overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    #sitp-chat-panel.open { display: flex; }

    #sitp-chat-header {
      padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
      display: flex; justify-content: space-between; align-items: center;
    }
    #sitp-chat-header h3 { margin: 0; font-size: 0.95rem; font-weight: 700; color: #fff; }
    #sitp-chat-header span { font-size: 0.75rem; color: rgba(255,255,255,0.4); }
    #sitp-chat-close {
      background: none; border: none; color: rgba(255,255,255,0.4);
      cursor: pointer; font-size: 1.25rem; padding: 0; line-height: 1;
    }
    #sitp-chat-close:hover { color: #fff; }

    #sitp-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px 16px 8px;
      display: flex; flex-direction: column; gap: 10px;
      min-height: 280px; max-height: 340px;
    }
    #sitp-chat-messages::-webkit-scrollbar { width: 4px; }
    #sitp-chat-messages::-webkit-scrollbar-track { background: transparent; }
    #sitp-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

    .sitp-msg {
      max-width: 85%; padding: 10px 14px; border-radius: 1rem;
      font-size: 0.875rem; line-height: 1.55; word-wrap: break-word;
    }
    .sitp-msg a { color: #34d399; text-decoration: underline; }
    .sitp-msg-user {
      align-self: flex-end; background: #10b981; color: #020817;
      border-bottom-right-radius: 4px;
    }
    .sitp-msg-bot {
      align-self: flex-start; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85);
      border-bottom-left-radius: 4px;
    }

    .sitp-typing {
      align-self: flex-start; padding: 10px 14px;
      background: rgba(255,255,255,0.08); border-radius: 1rem;
      display: flex; gap: 4px; align-items: center;
    }
    .sitp-typing span {
      width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.3);
      animation: sitp-bounce 1.2s infinite;
    }
    .sitp-typing span:nth-child(2) { animation-delay: 0.15s; }
    .sitp-typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes sitp-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-4px); }
    }

    #sitp-chat-input-area {
      padding: 12px 16px; border-top: 1px solid rgba(255,255,255,0.1);
      display: flex; gap: 8px;
    }
    #sitp-chat-input {
      flex: 1; background: #1e293b; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 0.75rem; padding: 10px 14px; color: #fff;
      font-size: 0.875rem; outline: none; font-family: inherit;
      resize: none; min-height: 40px; max-height: 80px;
    }
    #sitp-chat-input::placeholder { color: rgba(255,255,255,0.3); }
    #sitp-chat-input:focus { border-color: #10b981; }
    #sitp-chat-send {
      background: #10b981; border: none; border-radius: 0.75rem;
      padding: 0 14px; cursor: pointer; display: flex;
      align-items: center; justify-content: center; flex-shrink: 0;
    }
    #sitp-chat-send:hover { background: #34d399; }
    #sitp-chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
    #sitp-chat-send svg { width: 18px; height: 18px; fill: #020817; }

    @media (max-width: 480px) {
      #sitp-chat-panel { width: calc(100vw - 32px); right: 16px; bottom: 88px; max-height: 70vh; }
      #sitp-chat-btn { bottom: 16px; right: 16px; }
    }
  `;
  document.head.appendChild(style);

  // Chat button
  const btn = document.createElement("button");
  btn.id = "sitp-chat-btn";
  btn.setAttribute("aria-label", "Open chat");
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/></svg>`;
  btn.onclick = toggleChat;
  document.body.appendChild(btn);

  // Chat panel
  const panel = document.createElement("div");
  panel.id = "sitp-chat-panel";
  panel.innerHTML = `
    <div id="sitp-chat-header">
      <div>
        <h3>Steve's IT Pro</h3>
        <span>Ask me about Google Workspace</span>
      </div>
      <button id="sitp-chat-close" aria-label="Close chat">&times;</button>
    </div>
    <div id="sitp-chat-messages"></div>
    <div id="sitp-chat-input-area">
      <textarea id="sitp-chat-input" placeholder="Ask a question..." rows="1"></textarea>
      <button id="sitp-chat-send" aria-label="Send message">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  `;
  document.body.appendChild(panel);

  // Elements
  const msgContainer = document.getElementById("sitp-chat-messages");
  const input = document.getElementById("sitp-chat-input");
  const sendBtn = document.getElementById("sitp-chat-send");

  document.getElementById("sitp-chat-close").onclick = toggleChat;
  sendBtn.onclick = sendMessage;
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  input.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = Math.min(this.scrollHeight, 80) + "px";
  });

  function toggleChat() {
    isOpen = !isOpen;
    panel.classList.toggle("open", isOpen);
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "Hi! I'm the Steve's IT Pro assistant. I can answer questions about Google Workspace, our services, or help you figure out which package is right for your business. What can I help with?"
      );
    }
    if (isOpen) input.focus();
  }

  function addBotMessage(text) {
    messages.push({ role: "assistant", content: text });
    renderMessage("bot", text);
  }

  function renderMessage(type, text) {
    const div = document.createElement("div");
    div.className = "sitp-msg sitp-msg-" + (type === "user" ? "user" : "bot");
    // Convert URLs to links and newlines to <br>
    div.innerHTML = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /https?:\/\/[^\s)]+/g,
        function (url) { return '<a href="' + url + '" target="_blank" rel="noreferrer">' + (url.length > 45 ? "Book a free consult" : url) + "</a>"; }
      )
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "sitp-typing";
    div.id = "sitp-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById("sitp-typing");
    if (el) el.remove();
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;

    // Add user message
    messages.push({ role: "user", content: text });
    renderMessage("user", text);
    input.value = "";
    input.style.height = "auto";

    isLoading = true;
    sendBtn.disabled = true;
    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: messages.filter((m) => m.role !== "system") }),
      });

      removeTyping();

      if (!res.ok) {
        const err = await res.json().catch(function () { return {}; });
        throw new Error(err.error || "Request failed");
      }

      const data = await res.json();
      addBotMessage(data.reply);
    } catch (err) {
      removeTyping();
      addBotMessage(
        "Sorry, I'm having trouble connecting right now. You can reach Steve directly at steve@stevesitpro.com or book a free consult here: " +
          CONSULT_URL
      );
    }

    isLoading = false;
    sendBtn.disabled = false;
    input.focus();
  }
})();
