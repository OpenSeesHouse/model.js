import * as THREE from "three";
import {LineElement} from "./LineElement"
export class TwoNodeLink extends LineElement {
    line!: THREE.Line<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.LineBasicMaterial, THREE.Object3DEventMap>;
    getColor(): number {
        return 0x0000ff;
    }
    constructor(tag:number, nodeTags:number[], args:string[]) {
        super(tag, nodeTags, args);
    }
    
    getName() {
        return "TwoNodeLink";
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


