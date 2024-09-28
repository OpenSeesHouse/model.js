import {BeamColumn} from "./BeamColumn.js"
export class ModElasticBeam2d extends BeamColumn {
    constructor(tag, node1Tag, node2Tag, args) {
        super(tag, node1Tag, node2Tag);
        this.args = args;
    }

    getName() {
        return "ModElasticBeam2d";
    }
    getColor() {
        return 0x00ff00
    }
}
