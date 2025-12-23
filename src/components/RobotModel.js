import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function RobotModel({ isSpeaking, emotion }) {
  const group = useRef();
  const bodyMesh = useRef();

  // Animation Loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Idle floating animation
    group.current.position.y = Math.sin(t) * 0.1;

    // Talking animation: Bob body faster and squash/stretch
    if (isSpeaking) {
      bodyMesh.current.scale.y = 1 + Math.sin(t * 10) * 0.05;
      bodyMesh.current.scale.x = 1 - Math.sin(t * 10) * 0.02;
    } else {
      // Return to normal shape smoothly
      bodyMesh.current.scale.lerp({ x: 1, y: 1, z: 1 }, 0.1);
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* ROBOT HEAD/BODY */}
      <mesh ref={bodyMesh} position={[0, 1.5, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color={emotion === "happy" ? "#00d2ff" : "#ff0055"} 
          roughness={0.3} 
          metalness={0.8} 
        />
      </mesh>

      {/* EYES (Simple Spheres) */}
      <group position={[0, 1.6, 0.85]}>
        <mesh position={[-0.3, 0, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.3, 0, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>

      {/* GLOWING CORE */}
      <mesh position={[0, 1, 0.8]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color={isSpeaking ? "#00ff88" : "#555"} />
      </mesh>

      {/* A simple shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshBasicMaterial color="#000" transparent opacity={0.2} />
      </mesh>

      {/* Floating Chat Bubble (Optional UI in 3D space) */}
      {isSpeaking && (
         <Html position={[1.5, 2.5, 0]} center>
            <div style={{ background: 'white', padding: '10px', borderRadius: '10px', width: '150px' }}>
               Listening...
            </div>
         </Html>
      )}
    </group>
  );
}