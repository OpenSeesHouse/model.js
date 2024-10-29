import { ThreeObject } from "../ThreeObject";
import { Domain } from "../Domain/Domain";
import { Node } from "../Node";
export abstract class Element extends ThreeObject {
    nodeTags: number[];
    args: string[];
    nodes!: Node[];
    constructor(tag:number, nodeTags:number[], args:string[]) {
        super(tag);
        this.nodeTags = nodeTags;
        this.args = args;
    }

    abstract getNumNodes():number;

    addToDomain(domain:Domain) {
        this.nodes = this.nodeTags.map(tag => {
            const node = domain.Nodes.get(tag);
            if (!node) {
            throw new Error(`Node not found for tag: ${tag}`);
            }
            return node;
            });
        domain.addElement(this);
    }
}

