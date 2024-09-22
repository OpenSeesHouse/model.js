import {BeamColumn} from "./BeamColumn"
export class ElasticTimoshenkoBeam extends BeamColumn {
    constructor(tag, node1Tag, node2Tag) {
        super(tag, node1Tag, node2Tag);
    }

    getName() {
        return "ElasticTimoshenkoBeam";
    }
    getColor() {
        return 0x00ff00
    }
}
