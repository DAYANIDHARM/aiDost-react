import { useRef, useState } from "react";

export default function useVoiceInput() {
  const recognitionRef = useRef(null);
  const finalTextRef = useRef("");

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiReply, setAiReply] = useState("");

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      alert("Text to Speech not supported");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.cancel(); // stop previous voice
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
      setTranscript("");
      finalTextRef.current = "";
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      finalTextRef.current = text;
      setTranscript(text);
    };

    recognition.onend = async () => {
      setListening(false);

      if (finalTextRef.current) {
        await sendToBackend(finalTextRef.current);
      }
    };

    recognition.start();
  };

  const sendToBackend = async (text) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL || "http://localhost:5000/ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        }
      );

      const data = await res.json();

      if (data.reply) {
        setAiReply(data.reply);
        speakText(data.reply); // 🔊 AI SPEAKS HERE
      }
    } catch (err) {
      console.error("Backend error:", err);
    }
  };

  return {
    listening,
    transcript,
    aiReply,
    startListening,
  };
}
