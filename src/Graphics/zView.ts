import * as THREE from 'three';
import { View, ViewDirection } from './View';
import { Scene } from './Scene';
import { _2dView } from './_2dView';

export class zView extends _2dView {
  constructor(canvas: HTMLCanvasElement, scs: Scene[]) {
    super(canvas, scs, ViewDirection.Y);
  }

  setLook(): void {
    const camDist = 0.2 * this.scenes[0].size;
    let unit = new THREE.Vector3();
    let pos = new THREE.Vector3();
    const scn = this.scenes[0];
    let left = 0, right = 0, bot = 0, top = 0;
    unit.set(0, 0, -1);
    pos.set(
      0.5 * (scn.minX + scn.maxX),
      0.5 * (scn.minY + scn.maxY),
      scn.maxZ + camDist,
    );
    [left, right, bot, top] = [scn.minX, scn.maxX, scn.minY, scn.maxY];
    const aspect = window.innerWidth / 2 / window.innerHeight;
    this.Camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
    console.log(`THREE.OrthographicCamera(${-aspect}, ${aspect}, 1, -1, 0.1, 1000)`);
    this.Camera.position.copy(pos);
    console.log(`this.Camera.position.copy(${pos.x} ${pos.y} ${pos.z})`);
    // this.Camera.rotation.z = -Math.PI;
    console.log(this.Camera.rotation);
    const light1 = new THREE.DirectionalLight();
    this.Camera.lookAt(pos.add(unit.multiplyScalar(camDist)));
    light1.position.copy(pos).normalize();
    console.log(`this.Camera.lookAt()`, pos);
    this.scenes.forEach(scn => scn.add(light1));
    const orthoCamera = this.Camera as THREE.OrthographicCamera;
    orthoCamera.updateProjectionMatrix();
  }

}
