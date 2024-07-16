import { proxy, subscribe } from "valtio";

const maxAngleVelocity = 90.0 / (180.0 * Math.PI) / 1000.0;
const geo = [
  [2.5 + 2.3, 0, 7.3],
  [0, 0, 13.0],
  [1, 0, 2],
  [12.6, 0, 0],
  [3.6, 0, 0],
  [0, 0, 0],
];

const state = proxy({
  angles: {
    A0: 0,
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    A5: 0,
  },
  configuration: [false, false, false],
  geometry: {
    V0: {
      x: geo[0][0],
      y: geo[0][1],
      z: geo[0][2],
    },
    V1: {
      x: geo[1][0],
      y: geo[1][1],
      z: geo[1][2],
    },
    V2: {
      x: geo[2][0],
      y: geo[2][1],
      z: geo[2][2],
    },
    V3: {
      x: geo[3][0],
      y: geo[3][1],
      z: geo[3][2],
    },
    V4: {
      x: geo[4][0],
      y: geo[4][1],
      z: geo[4][2],
    },
  },
  jointLimits: {
    J0: [(-190 / 180) * Math.PI, (190 / 180) * Math.PI],
    J1: [(-90 / 180) * Math.PI, (90 / 180) * Math.PI],
    J2: [(-135 / 180) * Math.PI, (45 / 180) * Math.PI],
    J3: [(-90 / 180) * Math.PI, (75 / 180) * Math.PI],
    J4: [(-139 / 180) * Math.PI, (90 / 180) * Math.PI],
    J5: [(-188 / 180) * Math.PI, (181 / 180) * Math.PI],
  },
  jointOutOfBound: [false, false, false, false, false, false],
  maxAngleVelocities: {
    J0: maxAngleVelocity,
    J1: maxAngleVelocity,
    J2: maxAngleVelocity,
    J3: maxAngleVelocity,
    J4: maxAngleVelocity,
    J5: maxAngleVelocity,
  },
  //TARGET
  targetPosition: {
    x: 10,
    y: 10,
    z: 10,
  },
  targetRotation: {
    x: 0,
    y: 0,
    z: 0,
  },
});

export default state;
