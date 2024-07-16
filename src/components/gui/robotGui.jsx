import { useSnapshot } from "valtio";
import { useControls, folder } from "leva";
import robotState from "../../store/robotStore"; // Ensure the correct path

function RobotGUI() {
  const snap = useSnapshot(robotState);

  // Setup angle controls with onChange to update the state
  useControls("Angles", {
    A0: {
      value: snap.angles.A0,
      min: -360,
      max: 360,
      onChange: (v) => (robotState.angles.A0 = v),
    },
    A1: {
      value: snap.angles.A1,
      min: -360,
      max: 360,
      onChange: (v) => (robotState.angles.A1 = v),
    },
    A2: {
      value: snap.angles.A2,
      min: -360,
      max: 360,
      onChange: (v) => (robotState.angles.A2 = v),
    },
    A3: {
      value: snap.angles.A3,
      min: -360,
      max: 360,
      onChange: (v) => (robotState.angles.A3 = v),
    },
    A4: {
      value: snap.angles.A4,
      min: -360,
      max: 360,
      onChange: (v) => (robotState.angles.A4 = v),
    },
    A5: {
      value: snap.angles.A5,
      min: -360,
      max: 360,
      onChange: (v) => (robotState.angles.A5 = v),
    },
  });

  return null; // No need to render anything for Leva controls
}

export default RobotGUI;
