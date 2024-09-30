import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import {LineElement} from "./LineElement.js"
export class Truss extends LineElement {
    constructor(tag, node1Tag, node2Tag) {
        super(tag, node1Tag, node2Tag);
    }

    getName() {
        return "Truss";
    }

    addToScene(scene) {
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

