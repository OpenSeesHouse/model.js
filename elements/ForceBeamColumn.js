import {BeamColumn} from "./BeamColumn"
export class ForceBeamColumn extends BeamColumn {
    constructor(tag, node1Tag, node2Tag) {
        super(tag, node1Tag, node2Tag);
    }

    getName() {
        return "ForceBeamColumn";
    }
    getColor() {
        return 0x00ff00
    }
}
