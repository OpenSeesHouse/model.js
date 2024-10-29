import * as THREE from "three";
import {LineElement} from "./LineElement"
export abstract class BeamColumn extends LineElement {
    line!: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial, THREE.Object3DEventMap>;

    constructor(tag:number, nodeTags:number[], args:string[]) {
        super(tag, nodeTags, args);
    }

    addToScene(scene:THREE.Scene) {
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


