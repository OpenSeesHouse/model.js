import * as THREE from 'three';
import { ViewDirection } from './View';
import { Scene } from './Scene';
import { _2dView } from './_2dView';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class xView extends _2dView {
  constructor(canvas: HTMLCanvasElement, scs: Scene[]) {
    super(canvas, scs, ViewDirection.X);
  }
  setLook(): void {
    const camDist = 0.2 * this.scenes[0].size;
    let unit = new THREE.Vector3();
    let pos = new THREE.Vector3();
    const scn = this.scenes[0];
    unit.set(1, 0, 0);
    pos.set(
      scn.minX - camDist,
      0.5 * (scn.minY + scn.maxY),
      0.5 * (scn.minZ + scn.maxZ),
    );
    console.log([scn.minY, scn.maxY, scn.minZ, scn.maxZ])
    let w = this.Canvas.clientWidth;
    let h = this.Canvas.clientHeight;
    const aspect = (w / h);
    let fac = Math.max(this.scenes[0].size/aspect,h);
    console.log(`w= ${w}, fac= ${fac}`);
    this.Camera = new THREE.OrthographicCamera(-aspect*fac, aspect*fac, fac, -fac, this.scenes[0].size*0.01, this.scenes[0].size*1.5);
    console.log(`THREE.OrthographicCamera(${-aspect*fac}, ${aspect*fac}, ${fac}, ${-fac}, ${this.scenes[0].size*0.01}, ${this.scenes[0].size*1.5}`);
    this.Camera.position.copy(pos);
    console.log(pos);
    // this.Camera.rotation.z = -Math.PI;
    // console.log(this.Camera.rotation);
    pos = pos.add(unit.multiplyScalar(camDist));
    console.log(pos);
    
    this.Camera.up.set(0,0,1);
    this.Camera.lookAt(pos);
    this.Controls = new OrbitControls(this.Camera, this.Canvas);
    this.Controls.target.copy(pos);
    this.Controls.enablePan = true;
    this.Controls.enableRotate = false;
    this.Controls.update();
    // const light1 = new THREE.DirectionalLight();
    // light1.position.copy(pos).normalize();
    // this.scenes.forEach(scn => scn.add(light1));
    // this.scenes.forEach(scn => scn.add(light1.target));
    const orthoCamera = this.Camera as THREE.OrthographicCamera;
    orthoCamera.updateProjectionMatrix();
  }

}
