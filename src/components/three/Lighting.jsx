import * as THREE from "three";
import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";

const Lighting = () => {
  const light = new THREE.AmbientLight(0xaaaaaa);

  const light2 = new THREE.DirectionalLight(0xaaaaaa);
  light2.position.set(1, 1.3, 1).normalize();

  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(0x333333);
  });

  return (
    <>
      <primitive object={light} />
      <primitive object={light2} />
    </>
  );
};

export default Lighting;
