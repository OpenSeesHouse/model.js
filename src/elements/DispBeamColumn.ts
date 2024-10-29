import {BeamColumn} from "./BeamColumn"
export class DispBeamColumn extends BeamColumn {
    constructor(tag:number, nodeTags:number[], args:string[]) {
        super(tag, nodeTags, args);
    }

    getName():string {
        return "DispBeamColumn";
    }
    getColor():number {
        return 0x00ff00
    }
}
