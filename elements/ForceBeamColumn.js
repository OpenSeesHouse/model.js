import {BeamColumn} from "./BeamColumn.js"
export class ForceBeamColumn extends BeamColumn {
    constructor(tag, node1Tag, node2Tag, args) {
        super(tag, node1Tag, node2Tag);
        // console.log('ForceBeamColumn ctor')
        this.args = args;
    }

    getName() {
        return "ForceBeamColumn";
    }
    getColor() {
        return 0x00ff00
    }
}
