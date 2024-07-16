import * as THREE from "three";

const Helpers = () => {
  const size = 10;
  const step = 20;

  const gridHelper = new THREE.GridHelper(size, step);
  gridHelper.rotation.x = Math.PI / 2;

  const axisHelper = new THREE.AxesHelper(5);

  return (
    <>
      <primitive object={gridHelper} />
      <primitive object={axisHelper} />
    </>
  );
};

export default Helpers;
