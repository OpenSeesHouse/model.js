import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import {LineElement} from "./LineElement.js"
export class BeamColumn extends LineElement {
    static color = 0xff00ff; // Default color for all beamColumns

    constructor(tag, node1Tag, node2Tag) {
        super(tag, node1Tag, node2Tag);
        // console.log('BeamColumn ctor')
        if (this.constructor === BeamColumn) {
            throw new Error("Abstract export classes can't be instantiated.");
        }
    }

    addToScene(scene) {
        const curve = new THREE.CatmullRomCurve3([this.nodes[0].position, this.nodes[1].position]);
        const points = curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: BeamColumn.color });
        this.line = new THREE.Line(geometry, material);
        scene.add(this.line);
    }

    update() {
        const curve = new THREE.CatmullRomCurve3([this.nodes[0].position, this.nodes[1].position]);
        const points = curve.getPoints(50);
        this.line.geometry.setFromPoints(points);
    }
}


