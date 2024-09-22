import {QuadElement} from "./QuadElement"
export class Joint2D extends QuadElement {
    constructor(tag, nodeTags) {
        super(tag, nodeTags);
    }

    getColor() {
        return 0x00ff00;
    }

    addToScene(scene) {
        const geometry = new THREE.Geometry();
        const material = new THREE.MeshBasicMaterial({ color: this.getColor(), side: THREE.DoubleSide });

        // Calculate the corner positions based on the midpoints
        const corners = this.calculateCorners();

        // Create vertices for the parallelogram
        corners.forEach(corner => {
            geometry.vertices.push(new THREE.Vector3(...corner));
        });

        // Create faces for the parallelogram
        geometry.faces.push(new THREE.Face3(0, 1, 2));
        geometry.faces.push(new THREE.Face3(2, 3, 0));

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

    calculateCorners() {
        const midpoints = this.nodes.map(node => node.coordinates);
        const [m1, m2, m3, m4] = midpoints;

        // Calculate the corner positions based on the midpoints
        const c1 = [m1[0] + (m1[0] - m3[0]), m1[1] + (m1[1] - m3[1]), m1[2] + (m1[2] - m3[2])];
        const c2 = [m2[0] + (m2[0] - m4[0]), m2[1] + (m2[1] - m4[1]), m2[2] + (m2[2] - m4[2])];
        const c3 = [m3[0] + (m3[0] - m1[0]), m3[1] + (m3[1] - m1[1]), m3[2] + (m3[2] - m1[2])];
        const c4 = [m4[0] + (m4[0] - m2[0]), m4[1] + (m4[1] - m2[1]), m4[2] + (m4[2] - m2[2])];

        return [c1, c2, c3, c4];
    }

    getName() {
        return "Joint2D";
    }
}