import { ThreeObject } from "../ThreeObject";
export class Element extends ThreeObject {
    constructor(tag, nodeTags, args = ['']) {
        super(tag);
        if (this.constructor === Element) {
            throw new Error("Abstract export classes can't be instantiated.");
        }
        this.nodeTags = nodeTags;
        this.args = args;
    }

    getNumNodes() {
        return this.nodeTags.length;
    }

    addToDomain(Domain) {
        this.nodes = nodeTags.map(tag => Domain.Nodes[tag]);
        Domain.addElement(this);
    }
}

