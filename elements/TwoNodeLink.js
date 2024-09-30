import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import {LineElement} from "./LineElement.js"
export class TwoNodeLink extends LineElement {
    constructor(tag, node1Tag, node2Tag, args) {
        super(tag, node1Tag, node2Tag);
        this.args = args;
    }
    
    getName() {
        return "TwoNodeLink";
    }

    addToScene(scene) {
        const curve = new THREE.CatmullRomCurve3([this.nodes[0].position, this.nodes[1].position]);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: this.getColor() });
        this.line = new THREE.Line(geometry, material);
        scene.add(this.line);
    }

    update() {
        const curve = new THREE.CatmullRomCurve3([this.nodes[0].position, this.nodes[1].position]);
        const points = curve.getPoints(50);
        this.line.geometry.setFromPoints(points);
    }
}


