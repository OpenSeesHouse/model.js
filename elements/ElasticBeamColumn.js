import {BeamColumn} from "./BeamColumn"
export class ElasticBeamColumn extends BeamColumn {
    constructor(tag, node1Tag, node2Tag) {
        super(tag, node1Tag, node2Tag);
    }

    getName() {
        return "ElasticBeamColumn";
    }
    getColor() {
        return 0x00ff00
    }
}
