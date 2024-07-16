import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { TransformControls } from "@react-three/drei";
import * as THREE from "three";
import robotStore from "../../store/targetStore"; // Ensure the correct path
import targetStore from "../../store/targetStore";

const Target = () => {
  const snap = useSnapshot(robotStore);
  const targetRef = useRef();
  const eulerRingsRef = useRef();

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.position.set(
        snap.position.x,
        snap.position.y,
        snap.position.z
      );
      targetRef.current.rotation.set(
        snap.rotation.x,
        snap.rotation.y,
        snap.rotation.z
      );
    }
  }, [snap.position, snap.rotation]);

  useFrame(() => {
    if (targetRef.current && snap.followTarget) {
      robotStore.setTarget(
        targetRef.current.position,
        targetRef.current.rotation
      );
    }
  });

  return (
    <>
      <group ref={targetRef}>
        <mesh
          geometry={new THREE.CylinderGeometry(1, 1, 2, 32)}
          material={
            new THREE.MeshBasicMaterial({
              transparent: true,
              opacity: 0.7,
              color: 0xaaaaaa,
            })
          }
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 1]}
        />
      </group>
      <group ref={eulerRingsRef} visible={snap.eulerRingsVisible}>
        <EulerRing radius={2.0} color={0xff0000} axis="x" />
        <EulerRing radius={1.75} color={0x00ff00} axis="y" />
        <EulerRing radius={1.5} color={0x0000ff} axis="z" />
      </group>
      <TransformControls
        object={targetRef.current}
        mode={snap.controlMode}
        space={snap.controlSpace}
        visible={snap.controlVisible}
        onChange={() => {
          if (snap.followTarget) {
            robotStore.setTarget(
              targetRef.current.position,
              targetRef.current.rotation
            );
          }
        }}
        onMouseDown={() => {
          targetStore.cameraEnabled = false;
        }}
        onMouseUp={() => {
          targetStore.cameraEnabled = true;
        }}
      />
    </>
  );
};

const EulerRing = ({ radius, color, axis }) => {
  const ringMaterial = new THREE.MeshLambertMaterial({ color });
  const ringRef = useRef();

  useEffect(() => {
    if (ringRef.current) {
      if (axis === "x") {
        ringRef.current.rotation.y = Math.PI / 2;
      } else if (axis === "y") {
        ringRef.current.rotation.x = Math.PI / 2;
      }
    }
  }, [axis]);

  return (
    <group ref={ringRef}>
      <mesh
        geometry={new THREE.TorusGeometry(radius, 0.05, 6, 50)}
        material={ringMaterial}
      />
      <mesh
        geometry={new THREE.SphereGeometry(0.12, 12, 10)}
        material={ringMaterial}
        position={[radius, 0, 0]}
      />
    </group>
  );
};

export default Target;
