import { Element } from "./Element.js";
export class QuadElement extends Element {
    constructor(tag, node1Tag, node2Tag, node3Tag, node4Tag) {
        super(tag, [node1Tag, node2Tag, node3Tag, node4Tag]);
        if (this.constructor === QuadElement) {
            throw new Error("Abstract export classes can't be instantiated.");
        }
    }
}

