import {BeamColumn} from "./BeamColumn.js"
export class DispBeamColumn extends BeamColumn {
    constructor(tag, node1Tag, node2Tag, args) {
        super(tag, node1Tag, node2Tag);
        this.args = args;
    }

    getName() {
        return "DispBeamColumn";
    }
    getColor() {
        return 0x00ff00
    }
}
