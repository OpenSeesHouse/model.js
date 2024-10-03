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
        for (let obj of this.Nodes.values()) obj.update();
        for (let obj of this.Elements.values()) obj.update();
        for (let obj of this.UniaxialMaterials.values()) obj.update();
        for (let obj of this.NDMaterials.values()) obj.update();
        for (let obj of this.Sections.values()) obj.update();
        for (let obj of this.Patterns.values()) obj.update();
        for (let obj of this.Recorders.values()) obj.update();
    }
    wipe() {
        this.Nodes.clear();
        this.Elements.clear();
        this.UniaxialMaterials.clear();
        this.NDMaterials.clear();
        this.Sections.clear();
        this.Patterns.clear();
        this.Recorders.clear();
    }

    addNode(Node) {
        if (this.Nodes[Node.tag])
            throw new Error(`Node with tag ${tg} already exists in Domain`);
        this.Nodes.set(Node.tag, Node);
    }
    addElement(ele) {
        if (this.Elements[ele.tag])
            throw new Error(`Element with tag ${tg} already exists in Domain`);
        this.Elements.set(ele.tag, ele);
    }

    addToScene(scene) {
        for (let nd of this.Nodes.values()) {
            nd.addToScene(scene);
        }
        for (let ele of this.Elements.values()) {
            ele.addToScene(scene);
        }
    }
}

