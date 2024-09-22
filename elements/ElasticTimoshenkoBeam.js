import {BeamColumn} from "./BeamColumn"
export class ModElasticBeam2d extends BeamColumn {
    constructor(tag, node1Tag, node2Tag) {
        super(tag, node1Tag, node2Tag);
    }

    getName() {
        return "ModElasticBeam2d";
    }
    getColor() {
        return 0x00ff00
    }
}
