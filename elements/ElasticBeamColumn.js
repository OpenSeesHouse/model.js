import {BeamColumn} from "./BeamColumn.js"
export class ElasticBeamColumn extends BeamColumn {
    constructor(tag, node1Tag, node2Tag, args) {
        super(tag, node1Tag, node2Tag);
        this.args = args;
    }

    getName() {
        return "ElasticBeamColumn";
    }
    getColor() {
        return 0x00ff00
    }
}
