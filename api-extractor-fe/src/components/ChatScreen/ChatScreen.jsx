import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "./ChatScreen.scss";
import { sendMessageAPI } from "../../services/excelService";

export default function ChatScreen({ selectedExcel }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Mutation for sending message
  const mutation = useMutation({
    mutationFn: (req) => sendMessageAPI(req),
    onSuccess: (data) => {
      const botMsg = {
        text: JSON.stringify(data?.response) || "No response",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    },
    onError: () => {
      const errorMsg = { text: "Something went wrong!", sender: "bot" };
      setMessages((prev) => [...prev, errorMsg]);
    },
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    mutation.mutate({ prompt: input, doc_id: selectedExcel?.id });
    setInput("");
  };

  return (
    <div className="chat-screen">
      <h2>Chat</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}

        {/* Loader */}
        {mutation.isPending && (
          <div className="chat-message bot typing">...</div>
        )}
         <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!selectedExcel || mutation.isPending}
          placeholder={!selectedExcel ? "Please select any uploaded excels" : "Type a message..."}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={mutation.isPending}>
          {mutation.isPending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
