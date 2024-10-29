import {BeamColumn} from "./BeamColumn"
export class ModElasticBeam2d extends BeamColumn {
    constructor(tag:number, nodeTags:number[], args:string[]) {
        super(tag, nodeTags, args);
    }

    getName() {
        return "ModElasticBeam2d";
    }
    getColor() {
        return 0x00ff00
    }
}
