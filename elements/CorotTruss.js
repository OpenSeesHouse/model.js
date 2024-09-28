import {Truss} from "./Truss.js"
export class CorotTruss extends Truss {
    constructor(tag, node1Tag, node2Tag, args) {
        super(tag, node1Tag, node2Tag);
        this.args = args;
    }

    getName() {
        return "CorotTruss";
    }
    getColor() {
        return 0x00ff00
    }
}
