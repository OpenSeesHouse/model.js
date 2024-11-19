import * as THREE from "three";
import { LineElement } from "./LineElement"
import { Scene } from "../Graphics/Scene";
export class Truss extends LineElement {
  line!: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial, THREE.Object3DEventMap>;
  constructor(tag: number, nodeTags: number[], args: string[]) {
    super(tag, nodeTags, args);
  }

  getName() {
    return "Truss";
  }

  addToScene(scene: Scene, fac: number) {
    let pnt1: THREE.Vector3 = new THREE.Vector3(), pnt2: THREE.Vector3 = new THREE.Vector3();
    pnt1.copy(this.nodes[0].position);
    pnt2.copy(this.nodes[1].position);
    pnt1.multiplyScalar(fac);
    pnt2.multiplyScalar(fac);
    const geometry = new THREE.BufferGeometry().setFromPoints([pnt1, pnt2]);
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
    this.line.geometry.setFromPoints([pnt1, pnt2]);
  }
  getColor() {
    return 0x0000ff;
  }
}

