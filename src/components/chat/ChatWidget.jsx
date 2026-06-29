import { useState } from "react";
import axios from "axios";
import "./chat.css";

const API_URL = import.meta.env.VITE_API_URL;
const API_BASE = API_URL.replace("/auth", "");

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "¡Hola! 👋 Soy el asistente de Hospedar. ¿En qué te puedo ayudar?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/chat`, {
        message: input,
        history: messages
          .slice(1)
          .map((msg) => ({ role: msg.role, content: msg.content })),
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply },
      ]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hubo un error, intentá de nuevo." },
      ]);
    }

    setInput("");
    setLoading(false);
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="chat-fab">
        💬
      </button>

      {open && (
        <div className="chat-container">
          <div className="chat-header">Asistente de Hospedar</div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}

            {loading && <div className="chat-typing">Escribiendo...</div>}
          </div>

          <div className="chat-input-container">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Escribí..."
            />

            <button
              className="chat-send"
              onClick={sendMessage}
              disabled={loading}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
