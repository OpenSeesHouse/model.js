import * as THREE from "three";
import { QuadElement } from "./QuadElement"
export class Joint2D extends QuadElement {
    mesh!: THREE.Mesh<any, THREE.MeshBasicMaterial, THREE.Object3DEventMap>;
    constructor(tag: number, nodeTags: number[], args: string[]) {
        super(tag, nodeTags, args);
    }

    getColor() {
        return 0x00ff00;
    }

    addToScene(scene: THREE.Scene) {
        const material = new THREE.MeshBasicMaterial({ color: this.getColor(), side: THREE.DoubleSide });

        // Calculate the corner positions based on the midpoints
        const corners = this.calculateCorners();

        // Create vertices for the parallelogram
        const vertices = new Float32Array(corners.length * 3);
        corners.forEach((corner, i) => {
            vertices[i * 3] = corner[0];
            vertices[i * 3 + 1] = corner[1];
            vertices[i * 3 + 2] = corner[2];
        });
        const indices = new Uint16Array([
            0, 1, 2, // First face
            0, 2, 3  // Second face
        ]);

        // Create faces for the parallelogram
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));

        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);
    }

    update() {
        if (this.mesh) {
            // Calculate the new corner positions based on the updated midpoints
            const corners = this.calculateCorners();

            // Update the vertices positions
            corners.forEach((corner, index) => {
                this.mesh.geometry.vertices[index].set(...corner);
            });
            this.mesh.geometry.verticesNeedUpdate = true;
        }
    }

    calculateCorners(): number[][] {
        const midpoints = this.nodes.map(node => node.position);
        const [m1, m2, m3, m4] = midpoints;

        // Calculate the corner positions based on the midpoints
        const c1 = [m1.x + (m1.x - m3.x), m1.y + (m1.y - m3.y), m1.z + (m1.z - m3.z)];
        const c2 = [m2.x + (m2.x - m4.x), m2.y + (m2.y - m4.y), m2.z + (m2.z - m4.z)];
        const c3 = [m3.x + (m3.x - m1.x), m3.y + (m3.y - m1.y), m3.z + (m3.z - m1.z)];
        const c4 = [m4.x + (m4.x - m2.x), m4.y + (m4.y - m2.y), m4.z + (m4.z - m2.z)];

        return [c1, c2, c3, c4];
    }

    getName() {
        return "Joint2D";
    }
}