import {BeamColumn} from "./BeamColumn"
export class ElasticBeamColumn extends BeamColumn {
    constructor(tag:number, nodeTags:number[], args:string[]) {
        super(tag, nodeTags, args);
    }

    getName():string {
        return "ElasticBeamColumn";
    }
    getColor():number {
        return 0x00ff00
    }
}
