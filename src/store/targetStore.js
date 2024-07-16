// targetStore.js
import { proxy, ref } from "valtio";

const targetStore = proxy({
  refs: ref({
    controls: null,
  }),
  controlSpace: "world",
  eulerRingsVisible: false,
  controlVisible: true,
  controlMode: "translate",
  followTarget: true,
  manipulate: "rotate",
  cameraEnabled: true,
  position: {
    x: 10,
    y: 10,
    z: 10,
  },
  rotation: {
    x: 0,
    y: 0,
    z: 0,
  },
  setFollowTarget(data) {
    this.followTarget = data;
  },
  setEulerRingsVisible(data) {
    this.eulerRingsVisible = data;
  },
  setControlVisible(data) {
    this.controlVisible = data;
  },
  setControlMode(data) {
    this.controlMode = data;
  },
  setTarget(position, rotation) {
    this.position = { ...this.position, ...position };
    this.rotation = { ...this.rotation, ...rotation };
  },
  toggleControlSpace() {
    this.controlSpace = this.controlSpace === "local" ? "world" : "local";
  },
});

export default targetStore;
