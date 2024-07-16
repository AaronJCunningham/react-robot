import { proxy, subscribe } from "valtio";
import InverseKinematic from "../libraries/InverseKinematic";

// Define the initial geometry and joint limits
const maxAngleVelocity = 90.0 / (180.0 * Math.PI) / 1000.0;
const geo = [
  [2.5 + 2.3, 0, 7.3],
  [0, 0, 13.0],
  [1, 0, 2],
  [12.6, 0, 0],
  [3.6, 0, 0],
  [0, 0, 0],
];

// Initialize the Valtio store
const robotState = proxy({
  target: {
    position: { x: 10, y: 10, z: 10 },
    rotation: { x: Math.PI, y: 0, z: 0 },
  },
  angles: {
    A0: 0,
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    A5: 0,
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
  jointLimits: [
    [-Math.PI * (190 / 180), Math.PI * (190 / 180)],
    [-Math.PI * (90 / 180), Math.PI * (90 / 180)],
    [-Math.PI * (135 / 180), Math.PI * (45 / 180)],
    [-Math.PI * (90 / 180), Math.PI * (75 / 180)],
    [-Math.PI * (139 / 180), Math.PI * (90 / 180)],
    [-Math.PI * (188 / 180), Math.PI * (181 / 180)],
  ],
  configuration: [false, false, false],
  geometry: {
    V0: { x: geo[0][0], y: geo[0][1], z: geo[0][2] },
    V1: { x: geo[1][0], y: geo[1][1], z: geo[1][2] },
    V2: { x: geo[2][0], y: geo[2][1], z: geo[2][2] },
    V3: { x: geo[3][0], y: geo[3][1], z: geo[3][2] },
    V4: { x: geo[4][0], y: geo[4][1], z: geo[4][2] },
  },
});

// Define functions to manipulate the state
const updateIK = (geometry) => {
  // Assuming Kinematic is a class or function you import that takes geometry
  const IK = new InverseKinematic(geometry.map((g) => [g.x, g.y, g.z]));
  return IK;
};

const calculateAngles = (state) => {
  const { jointLimits, target, configuration } = state;
  const { position, rotation } = target;

  if (!position || !rotation || !jointLimits) {
    console.error("Position, rotation, or jointLimits are not defined");
    return;
  }

  const IK = updateIK(Object.values(state.geometry));
  const angles = [];
  IK.calculateAngles(
    position.x,
    position.y,
    position.z,
    rotation.x,
    rotation.y,
    rotation.z,
    angles,
    configuration
  );

  let outOfBounds = [false, false, false, false, false, false];
  angles.forEach((angle, i) => {
    if (angle < jointLimits[i][0] || angle > jointLimits[i][1]) {
      outOfBounds[i] = true;
    }
  });

  state.angles = {
    A0: angles[0],
    A1: angles[1],
    A2: angles[2],
    A3: angles[3],
    A4: angles[4],
    A5: angles[5],
  };
  state.jointOutOfBound = outOfBounds;
};

// Subscribe to changes in angles to recalculate all angles
subscribe(robotState.angles, () => {
  calculateAngles(robotState);
});

// Expose functions for actions
export const changeTarget = (position, rotation) => {
  robotState.target.position = position;
  robotState.target.rotation = rotation;
  calculateAngles(robotState);
};

export const changeGeometry = (geometry) => {
  robotState.geometry = geometry;
  calculateAngles(robotState);
};

export default robotState;
