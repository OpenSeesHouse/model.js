import { ThreeObject } from "../ThreeObject.js";
import { Domain } from "../Domain/Domain.js";
export class Element extends ThreeObject {
    constructor(tag, nodeTags, args = ['']) {
        super(tag);
        // console.log('Element ctor')
        if (this.constructor === Element) {
            throw new Error("Abstract export classes can't be instantiated.");
        }
        this.nodeTags = nodeTags;
        this.args = args;
    }

    getNumNodes() {
        throw new Error("Method 'getNumNodes()' must be implemented.");
    }

    addToDomain(Domain) {
        this.nodes = this.nodeTags.map(tag => Domain.Nodes.get(tag));
        Domain.addElement(this);
    }
}

