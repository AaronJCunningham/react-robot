import React, { useRef, useEffect } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import targetStore from "../../store/targetStore";
import { useSnapshot } from "valtio";

const CustomCamera = () => {
  const cameraRef = useRef();
  const controlsRef = useRef();
  const { cameraEnabled } = targetStore;
  const snapshot = useSnapshot(targetStore);

  useEffect(() => {
    controlsRef.enabled = cameraEnabled;
  }, [cameraEnabled]);

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[25, 25, 25]}
        up={[0, 0, 1]}
        fov={35}
      />
      <OrbitControls enabled={cameraEnabled} />
    </>
  );
};

export default CustomCamera;
