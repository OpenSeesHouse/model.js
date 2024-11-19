import * as THREE from 'three';
import { LineElement } from './LineElement';
import { Scene } from '../Graphics/Scene';
export class TwoNodeLink extends LineElement {
  line!: THREE.Line<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.LineBasicMaterial,
    THREE.Object3DEventMap
  >;
  getColor(): number {
    return 0x0000ff;
  }
  constructor(tag: number, nodeTags: number[], args: string[]) {
    super(tag, nodeTags, args);
  }

  getName() {
    return 'TwoNodeLink';
  }

  addToScene(scene: Scene, fac: number) {
    let pnt1: THREE.Vector3 = new THREE.Vector3(), pnt2: THREE.Vector3 = new THREE.Vector3();
    pnt1.copy(this.nodes[0].position);
    pnt2.copy(this.nodes[1].position);
    pnt1.multiplyScalar(fac);
    pnt2.multiplyScalar(fac);

    const curve = new THREE.CatmullRomCurve3([pnt1, pnt2]);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: this.getColor() });
    this.line = new THREE.Line(geometry, material);
    scene.add(this.line);
  }

  update(fac: number) {
    let pnt1: THREE.Vector3 = new THREE.Vector3(), pnt2: THREE.Vector3 = new THREE.Vector3();
    pnt1.copy(this.nodes[0].position);
    pnt2.copy(this.nodes[1].position);
    pnt1.multiplyScalar(fac);
    pnt2.multiplyScalar(fac);
    const curve = new THREE.CatmullRomCurve3([
      pnt1,
      pnt2
    ]);
    const points = curve.getPoints(50);
    this.line.geometry.setFromPoints(points);
  }
}
