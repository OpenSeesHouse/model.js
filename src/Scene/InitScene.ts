import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { InitAxes } from "./InitAxes";

export function InitScene(
  backColor: number,
  gridColor: number,
  xMin:number,
  xMax:number,
  yMin:number,
  yMax:number,
  gridSpan: number,
  axesSize: number,
  ndm: number
): [THREE.Scene, OrbitControls, THREE.WebGLRenderer, THREE.PerspectiveCamera, THREE.Group] {

  const scene: THREE.Scene = new THREE.Scene();
  scene.background = new THREE.Color(backColor);
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    (0.1 * axesSize) / 20,
    (5000 * axesSize) / 20
  );
  let size = 4* Math.max(Math.abs(xMax), Math.abs(xMin), Math.abs(yMin), Math.abs(yMax));
  const nGridDivs = Math.ceil(size/gridSpan);
  size = nGridDivs*gridSpan;
  const camDist = size / 4;
  if (ndm == 3) {
    camera.position.set(-camDist, -camDist, camDist);
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);
  } else {
    // camera.position.set(-camDist, -camDist, camDist);
    // THREE.Object3D.DefaultUp.set(0, 0, 1);
    camera.position.set(0, 0, camDist);
    THREE.Object3D.DEFAULT_UP.set(0, 1, 0);
  }
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //Camera control
  const controls = new OrbitControls(camera, renderer.domElement);
  camera.lookAt(0, 0, 0);
  controls.update();

  // screen resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });


  const [Axes, labels] = InitAxes(axesSize);
  Axes.renderOrder = 1;
  scene.add(Axes);
  scene.add(labels);

  // the horizon
  const gridHelper = new THREE.GridHelper(
    size,
    nGridDivs,
    gridColor,
    gridColor
  );
  gridHelper.position.set((xMax+xMin)/2,(yMax+yMin)/2,0);
  // console.log(`position.set(${(xMax+xMin)/2},${(yMax+yMin)/2},0)`);
  
  if (ndm == 3) gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);

  return [scene, controls, renderer, camera, labels];
}
