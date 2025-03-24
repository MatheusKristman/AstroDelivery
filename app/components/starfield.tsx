"use client";

import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo } from "react";

const Starfield = () => {
  const stars = useMemo(() => {
    const positions = new Float32Array(5000 * 3); // 5000 estrelas

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 1] }} className="!absolute inset-0 z-10">
      <ambientLight intensity={0.5} />

      <Points positions={stars} stride={3}>
        <PointMaterial size={0.005} transparent color="white" />
      </Points>
    </Canvas>
  );
};

export default Starfield;
