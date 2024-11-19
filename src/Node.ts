import { Domain } from './Domain/Domain';
import { Scene } from './Graphics/Scene';
import { ThreeObject } from './ThreeObject';
import * as THREE from 'three';
export class Node extends ThreeObject {
  getColor(): number {
    return 0x000000;
  }
  static size = NaN; // Default size for all nodes in 
  position: THREE.Vector3;
  rotation: THREE.Euler;
  mesh!: THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshBasicMaterial,
    THREE.Object3DEventMap
  >;

  constructor(tag: number, x: number, y: number, z: number) {
    super(tag);
    this.position = new THREE.Vector3(x, y, z);
    this.rotation = new THREE.Euler(0, 0, 0);
  }

  getName(): string {
    return 'Node';
  }

  addToDomain(domain: Domain) {
    domain.addNode(this);
  }

  update(fac:number): void {
    // Empty method for now
  }

  async addToScene(scene: Scene, fac:number) {
    const geometry = new THREE.BoxGeometry(Node.size, Node.size, Node.size);
    const material = new THREE.MeshBasicMaterial({ color: this.getColor() });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(this.position);
    this.mesh.position.multiplyScalar(fac);
    this.mesh.rotation.copy(this.rotation);
    scene.add(this.mesh);
  }

  updatePosition(x: number, y: number, z: number, fac:number): void {
    this.position.set(x, y, z);
    if (this.mesh) {
      this.mesh.position.copy(this.position);
      this.mesh.position.multiplyScalar(fac);
    }
  }

  updateRotation(rx: number, ry: number, rz: number) {
    this.rotation.set(rx, ry, rz);
    if (this.mesh) {
      this.mesh.rotation.copy(this.rotation);
    }
  }
}
