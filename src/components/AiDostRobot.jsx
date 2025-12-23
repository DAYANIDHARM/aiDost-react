import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

export default function AiDostRobot({ isSpeaking }) {
  const group = useRef();
  const face = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Gentle breathing
    group.current.position.y = Math.sin(t * 1.5) * 0.05;

    // Speaking glow pulse
    face.current.material.emissiveIntensity = isSpeaking
      ? 1 + Math.sin(t * 8) * 0.5
      : 0.4;
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      
      {/* BODY */}
      <RoundedBox args={[2, 2.5, 1.5]} radius={0.4}>
        <meshStandardMaterial color="#f4f7ff" roughness={0.3} />
      </RoundedBox>

      {/* FACE VISOR */}
      <RoundedBox
        ref={face}
        args={[1.5, 0.9, 0.1]}
        radius={0.2}
        position={[0, 0.3, 0.76]}
      >
        <meshStandardMaterial
          color="#0b132b"
          emissive="#00e5ff"
          emissiveIntensity={0.4}
        />
      </RoundedBox>

      {/* EYES */}
      <mesh position={[-0.3, 0.3, 0.82]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>

      <mesh position={[0.3, 0.3, 0.82]}>
        <circleGeometry args={[0.08, 32]} />
        <meshBasicMaterial color="#00e5ff" />
      </mesh>
    </group>
  );
}
