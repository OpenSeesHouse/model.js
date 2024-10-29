import {BeamColumn} from "./BeamColumn"
export class ElasticTimoshenkoBeam extends BeamColumn {
    constructor(tag:number, nodeTags:number[], args:string[]) {
        super(tag, nodeTags, args);
    }

    getName():string {
        return "ElasticTimoshenkoBeam";
    }
    getColor():number {
        return 0x00ff00
    }
}
