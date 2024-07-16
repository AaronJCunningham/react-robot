import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import InverseKinematic from "../libraries/InverseKinematic";
import Robot from "../components/three/Robot";
import RobotGUI from "../components/gui/robotGui";
import CustomCamera from "../components/three/CustomCamera";
import Lighting from "../components/three/Lighting";
import Helpers from "../components/three/Helpers";
import Target from "../components/three/Target";

const SimpleScene: React.FC = () => {
  return (
    <div className="main-scene">
      <RobotGUI />
      <Canvas>
        <Helpers />
        <CustomCamera />
        <Lighting />

        <ambientLight />
        <Robot />
        <Target />
      </Canvas>
    </div>
  );
};

export default SimpleScene;
