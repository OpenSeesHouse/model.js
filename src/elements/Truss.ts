import * as THREE from "three";
import {LineElement} from "./LineElement"
export class Truss extends LineElement {
    line!: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial, THREE.Object3DEventMap>;
    constructor(tag:number, nodeTags:number[], args:string[]) {
        super(tag, nodeTags, args);
    }

    getName() {
        return "Truss";
    }

    addToScene(scene:THREE.Scene) {
        const geometry = new THREE.BufferGeometry().setFromPoints([this.nodes[0].position, this.nodes[1].position]);
        const material = new THREE.LineBasicMaterial({ color: this.getColor() });
        this.line = new THREE.Line(geometry, material);
        scene.add(this.line);
    }

    update() {
        this.line.geometry.setFromPoints([this.nodes[0].position, this.nodes[1].position]);
    }
    getColor() {
        return 0x0000ff;
    }
}

