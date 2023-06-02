import { Canvas } from "@react-three/fiber";
import React from "react";
import Box from "./Box";
import Camera from "./Camera";

const FiberExample = () => {
  return (
    <Canvas>
      <Camera />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
};

export default FiberExample;
