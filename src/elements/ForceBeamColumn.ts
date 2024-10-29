import {BeamColumn} from "./BeamColumn"
export class ForceBeamColumn extends BeamColumn {
    constructor(tag:number, nodeTags:number[], args:string[]) {       
        super(tag, nodeTags, args);
    }

    getName():string {
        return "ForceBeamColumn";
    }
    getColor():number {
        return 0x00ff00
    }
}
