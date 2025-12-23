import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AiDostRobot from "./AiDostRobot";

export default function Scene({ isSpeaking }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 6], fov: 40 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} />

      <AiDostRobot isSpeaking={isSpeaking} />

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
