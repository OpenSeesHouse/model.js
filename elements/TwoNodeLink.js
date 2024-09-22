import {LineElement} from "./LineElement"
export class TwoNodeLink extends LineElement {
    constructor(tag, node1Tag, node2Tag) {
        super(tag, node1Tag, node2Tag);
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


