import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import {
  MeshLambertMaterial,
  BoxGeometry,
  Object3D,
  CylinderGeometry,
  Mesh,
} from "three";
import robotState from "../../store/robotStore"; // Ensure the correct path
import * as THREE from "three";

function Robot() {
  const snap = useSnapshot(robotState);
  const groupRef = useRef();

  // Reference to the current instance for inner functions
  const scope = useRef({ joints: [] });

  // Rebuild the robot when the geometry or joint limits change
  useEffect(() => {
    if (groupRef.current) {
      buildRobot(
        groupRef.current,
        snap.geometry,
        snap.jointLimits,
        scope.current
      );
    }
  }, [snap.geometry, snap.jointLimits]);

  // Update robot's angles
  useFrame(() => {
    if (groupRef.current && snap.angles) {
      // Accessing each child and updating according to the stored angles object
      if (groupRef.current.children[0])
        groupRef.current.children[0].rotation.z = snap.angles.A0;
      if (groupRef.current.children[1])
        groupRef.current.children[1].rotation.y = snap.angles.A1;
      if (groupRef.current.children[2])
        groupRef.current.children[2].rotation.y = snap.angles.A2;
      if (groupRef.current.children[3])
        groupRef.current.children[3].rotation.x = snap.angles.A3;
      if (groupRef.current.children[4])
        groupRef.current.children[4].rotation.y = snap.angles.A4;
      if (groupRef.current.children[5])
        groupRef.current.children[5].rotation.z = snap.angles.A5;
    }
  });

  return <group ref={groupRef} />;
}

function buildRobot(parentObject, geometry, limits, scope) {
  // Clear existing children
  while (parentObject.children.length > 0) {
    parentObject.remove(parentObject.children[0]);
  }

  let x = 0,
    y = 0,
    z = 0;
  Object.values(geometry).forEach((g, index) => {
    // Ensure limits are in an array and accessible
    const limit = limits[index];
    const linkGeo = createCube(
      x,
      y,
      z,
      g.x,
      g.y,
      g.z,
      limit[0],
      limit[1],
      index,
      scope
    );
    x += g.x;
    y += g.y;
    z += g.z;
    parentObject.add(linkGeo);
  });
}

const colors = [0xaaaaaa, 0xbbbbbb, 0xbcbcbc, 0xcbcbcb, 0xcccccc, 0x0];

function createCube(x, y, z, w, h, d, min, max, jointNumber, scope) {
  const thicken = 1;

  const w_thickened = Math.abs(w) + thicken;
  const h_thickened = Math.abs(h) + thicken;
  const d_thickened = Math.abs(d) + thicken;

  const material = new THREE.MeshLambertMaterial({
    color: colors[jointNumber],
  });
  const geometry = new THREE.BoxGeometry(w_thickened, h_thickened, d_thickened);
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(w / 2, h / 2, d / 2);
  const group = new THREE.Object3D();
  group.position.set(x, y, z);
  group.add(mesh);

  console.log(min, max);
  // min = min / 180 * Math.PI
  // max = max / 180 * Math.PI

  const jointGeo1 = new THREE.CylinderGeometry(
    0.8,
    0.8,
    0.8 * 2,
    32,
    32,
    false,
    -min,
    2 * Math.PI - max + min
  );
  const jointGeoMax = new THREE.CylinderGeometry(
    0.8,
    0.8,
    0.8 * 2,
    32,
    32,
    false,
    -max,
    max
  );
  const jointGeoMin = new THREE.CylinderGeometry(
    0.8,
    0.8,
    0.8 * 2,
    32,
    32,
    false,
    0,
    -min
  );
  const jointMesh1 = new THREE.Mesh(
    jointGeo1,
    new THREE.MeshBasicMaterial({
      color: 0xffbb00,
    })
  );
  const jointMeshMax = new THREE.Mesh(
    jointGeoMax,
    new THREE.MeshBasicMaterial({
      color: 0x009900,
    })
  );
  const jointMeshMin = new THREE.Mesh(
    jointGeoMin,
    new THREE.MeshBasicMaterial({
      color: 0xdd2200,
    })
  );

  const joint = new THREE.Group();
  // joint.add(jointMesh1, jointMesh2)
  joint.add(jointMeshMax, jointMeshMin, jointMesh1);

  scope.joints.push(joint);

  switch (jointNumber) {
    case 0:
      joint.rotation.x = Math.PI / 2;
      break;
    case 1:
      // joint.rotation.x = Math.PI / 2
      break;
    case 2:
      // joint.rotation.x = Math.PI / 2
      break;
    case 3:
      joint.rotation.z = Math.PI / 2;
      // joint.rotation.y = Math.PI
      break;
    case 4:
      // joint.rotation.x = Math.PI / 2
      joint.rotation.y = Math.PI / 2;
      break;
    case 5:
      joint.rotation.x = Math.PI / 2;
      group.rotation.y = Math.PI / 2;
      // group.rotation.z = Math.PI
      // group.rotation.z = -Math.PI / 2
      // group.rotation.y += Math.PI
      // joint.rotation.z = +Math.PI / 2
      // const axisHelper = new THREE.AxisHelper(3)
      // axisHelper.rotation.x = Math.PI
      // group.add(axisHelper)
      const arrowZ = new THREE.ArrowHelper(
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, 0),
        3,
        0x0000ff
      );
      arrowZ.line.material.linewidth = 4;
      group.add(arrowZ);
      const arrowY = new THREE.ArrowHelper(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 0),
        3,
        0x00ff00
      );
      arrowY.line.material.linewidth = 4;
      group.add(arrowY);
      const arrowX = new THREE.ArrowHelper(
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 0, 0),
        3,
        0xff0000
      );
      arrowX.line.material.linewidth = 4;
      group.add(arrowX);
      // joint.add(getVectorArrow([0,0,0],[0,0,5]))
      break;
  }

  group.add(joint);
  return group;
}

export default Robot;
