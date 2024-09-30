import { Element } from "./Element.js";
export class LineElement extends Element {
    constructor(tag, node1Tag, node2Tag) {
        super(tag, [node1Tag, node2Tag]);
        if (this.constructor === LineElement) {
            throw new Error("Abstract export classes can't be instantiated.");
        }
    }
}

