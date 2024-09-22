import {Truss} from "./Truss"
export class CorotTruss extends Truss {
    constructor(tag, node1Tag, node2Tag) {
        super(tag, node1Tag, node2Tag);
    }

    getName() {
        return "CorotTruss";
    }
    getColor() {
        return 0x00ff00
    }
}
