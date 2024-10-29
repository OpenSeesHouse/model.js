import { Domain } from "./Domain/Domain";
import { ThreeObject } from "./ThreeObject";
import * as THREE from "three";
export class Node extends ThreeObject {
    getColor(): number {
        return 0x000000;
    }
    static size = 0.2; // Default size for all nodes
    position: THREE.Vector3;
    rotation: THREE.Euler;
    mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;
    
    constructor(tag:number, x:number, y:number, z:number) {
        super(tag);
        this.position = new THREE.Vector3(x, y, z);
        this.rotation = new THREE.Euler(0, 0, 0);
        const geometry = new THREE.BoxGeometry(Node.size, Node.size, Node.size);
        const material = new THREE.MeshBasicMaterial({ color: this.getColor() });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
        this.mesh.rotation.copy(this.rotation);
    }

    getName():string {
        return "Node";
    }

    addToDomain(domain:Domain):void {
        domain.addNode(this);
    }

    update():void {
        // Empty method for now
    }

    async addToScene(scene:THREE.Scene) {
        scene.add(this.mesh);
    }

    updatePosition(x:number, y:number, z:number):void {
        this.position.set(x, y, z);
        if (this.mesh) {
            this.mesh.position.copy(this.position);
        }
    }

    updateRotation(rx:number, ry:number, rz:number) {
        this.rotation.set(rx, ry, rz);
        if (this.mesh) {
            this.mesh.rotation.copy(this.rotation);
        }
    }

}
