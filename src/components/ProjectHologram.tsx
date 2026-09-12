import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

export type HologramShape = "torusKnot" | "icosahedron" | "octahedron" | "dodecahedron" | "torus";

interface ProjectHologramProps {
  shape: HologramShape;
  color?: string;
}

const HologramGeometry = ({ shape }: { shape: HologramShape }) => {
  switch (shape) {
    case "torusKnot":
      return <torusKnotGeometry args={[0.85, 0.24, 128, 16]} />;
    case "icosahedron":
      return <icosahedronGeometry args={[1.2, 0]} />;
    case "octahedron":
      return <octahedronGeometry args={[1.35, 0]} />;
    case "dodecahedron":
      return <dodecahedronGeometry args={[1.1, 0]} />;
    case "torus":
      return <torusGeometry args={[0.95, 0.35, 24, 64]} />;
  }
};

const HologramModel = ({ shape, color = "#22d3ee" }: ProjectHologramProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const padRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
    if (padRef.current) {
      padRef.current.rotation.z -= delta * 0.15;
      const material = padRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <>
      {/* Projector pad */}
      <mesh ref={padRef} position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 1.05, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      <Float speed={2.2} rotationIntensity={0.35} floatIntensity={0.45}>
        <group ref={groupRef}>
          <mesh>
            <HologramGeometry shape={shape} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.55}
              transparent
              opacity={0.28}
              roughness={0.15}
              metalness={0.4}
            />
          </mesh>
          <mesh scale={1.015}>
            <HologramGeometry shape={shape} />
            <meshBasicMaterial color={color} wireframe transparent opacity={0.75} />
          </mesh>
        </group>
      </Float>

      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color={color} />
      <pointLight position={[-3, -2, -3]} intensity={0.5} color={color} />
    </>
  );
};

/**
 * A small interactive "hologram" — drag to rotate, auto-rotates when idle.
 * Renders as a transparent 3D scene meant to sit inside a themed card.
 */
const ProjectHologram = ({ shape, color }: ProjectHologramProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 6], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <HologramModel shape={shape} color={color} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.4}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
};

export default ProjectHologram;
