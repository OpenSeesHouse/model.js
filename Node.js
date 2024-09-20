// Base class for a finite-element node
class Node {
    static size = 0.5; // Default size for all nodes
    static color = 0xff0000; // Default color for all nodes

    constructor(x, y, z) {
        this.position = new THREE.Vector3(x, y, z);
        this.rotation = new THREE.Euler(0, 0, 0);
    }

    addToScene(scene) {
        const geometry = new THREE.BoxGeometry(Node.size, Node.size, Node.size);
        const material = new THREE.MeshBasicMaterial({ color: Node.color });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
        this.mesh.rotation.copy(this.rotation);
        scene.add(this.mesh);
    }

    updatePosition(x, y, z) {
        this.position.set(x, y, z);
        if (this.mesh) {
            this.mesh.position.copy(this.position);
        }
    }

    updateRotation(rx, ry, rz) {
        this.rotation.set(rx, ry, rz);
        if (this.mesh) {
            this.mesh.rotation.copy(this.rotation);
        }
    }
}