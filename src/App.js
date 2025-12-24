import { useEffect, useState } from "react";
import Scene from "./components/Scene";
import UI from "./components/UI";
import useVoiceInput from "./hooks/useVoiceInput";

export default function App() {
  const { listening, transcript, aiReply, startListening } = useVoiceInput();
  const [message, setMessage] = useState("Hi, I am aiDost 👋");

  useEffect(() => {
    if (aiReply) {
      setMessage(aiReply); // Show AI response
    } else if (transcript) {
      setMessage(transcript); // Show user speech
    }
  }, [transcript, aiReply]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Scene isSpeaking={listening} />
      <UI
        isSpeaking={listening}
        onMicClick={startListening}
        message={message}
      />
    </div>
  );
}
