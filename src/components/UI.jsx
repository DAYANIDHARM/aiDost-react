import React from "react";
import "../styles/Ui.css";

export default function UI({ isSpeaking, onMicClick, message }) {
  return (
    <div className="ui-container">
      
      {/* Chat Bubble */}
      <div className={`chat-bubble ${isSpeaking ? "active" : ""}`}>
        {message || "Hi, I am aiDost 👋"}
      </div>

      {/* Mic Button */}
      <button
        className={`mic-btn ${isSpeaking ? "listening" : ""}`}
        onClick={onMicClick}
      >
        {isSpeaking ? "🎙️ Listening..." : "🎤 Talk to aiDost"}
      </button>

    </div>
  );
}
