import { Node } from "../Node.js";
export class Domain {
    constructor() {
        this.Nodes = new Map();
        this.Elements = new Map();
        this.UniaxialMaterials = new Map();
        this.NDMaterials = new Map();
        this.Sections = new Map();
        this.Patterns = new Map();
        this.Recorders = new Map();
    }
    update() {
        console.log("update called")
        for (let obj of this.Nodes.values()) obj.update();
        for (let obj of this.Elements.values()) obj.update();
        for (let obj of this.UniaxialMaterials.values()) obj.update();
        for (let obj of this.NDMaterials.values()) obj.update();
        for (let obj of this.Sections.values()) obj.update();
        for (let obj of this.Patterns.values()) obj.update();
        for (let obj of this.Recorders.values()) obj.update();
    }
    wipe() {
        console.log("wipe called")
        this.Nodes.clear();
        this.Elements.clear();
        this.UniaxialMaterials.clear();
        this.NDMaterials.clear();
        this.Sections.clear();
        this.Patterns.clear();
        this.Recorders.clear();
    }

    addNode(Node) {
        if (this.Nodes.has(Node.tag))
            throw new Error(`Node with tag ${tg} already exists in Domain`);
        // console.log(`this.Nodes.set(${Node.tag}, ${Node})`)
        this.Nodes.set(Node.tag, Node);
    }
    addElement(ele) {
        if (this.Elements.has(ele.tag))
            throw new Error(`Element with tag ${tg} already exists in Domain`);
        this.Elements.set(ele.tag, ele);
    }

    async addToScene(scene) {
        for (let nd of this.Nodes.values()) {
            // console.log("nd.addToScene(scene)");
            await nd.addToScene(scene);
        }
        for (let ele of this.Elements.values()) {
            ele.addToScene(scene);
        }
    }

    static setNodeSize(size) {
        Node.size = size;
    }
    getNodeBounds() {
        let maxX = -Infinity;
        let maxY = -Infinity;
        let maxZ = -Infinity;
        let minX = Infinity;
        let minY = Infinity;
        let minZ = Infinity;

        // Iterate through the Map
        for (let node of this.Nodes.values()) {
            if (node.position.X > maxX)
                maxX = node.position.X;
            else if (node.position.X < minX)
                minX = node.position.X;
            if (node.position.Y > maxY)
                maxY = node.position.Y;
            else if (node.position.Y < minY)
                minY = node.position.Y;
            if (node.position.Z > maxZ)
                maxZ = node.position.Z;
            else if (node.position.Z < minZ)
                minZ = node.position.Z;
        }
        return [minX, minY, minZ, maxX, maxY, maxZ];
    }
}

