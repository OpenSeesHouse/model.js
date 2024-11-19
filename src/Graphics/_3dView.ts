import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { View, ViewDirection } from './View';
import { Scene } from './Scene';

export class _3dview extends View {
  constructor(canvas: HTMLCanvasElement, scs: Scene[]) {
    super(canvas, scs, ViewDirection.XYZ);
    this.Camera = new THREE.PerspectiveCamera(
      50,
      canvas.width / canvas.height,
      0.01 * scs[0].size,
      1000 * scs[0].size,
    );
    this.Controls = new OrbitControls(this.Camera, this.Canvas);
    this.Controls.enablePan = true;
    const camDist = scs[0].size / 4;
    this.Camera.position.set(-camDist, -camDist, camDist);
    this.Camera.lookAt(0, 0, 0);
    this.Controls.update();
  }
  resize(): void {
    this.Renderer.setSize(this.Canvas.width, this.Canvas.height);
    const camera = this.Camera as THREE.PerspectiveCamera;
    camera.aspect = this.Canvas.width / this.Canvas.height;
    camera.updateProjectionMatrix();
  }

  setLook(): void {
    return;
  }
}
