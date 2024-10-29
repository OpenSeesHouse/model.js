import { Domain } from '../Domain/Domain'
import { Node } from '../Node';


export function importNode(myDomain:Domain, words: string[]): void {
    const tag = parseInt(words[0], 10);
    if (isNaN(tag)) {
        throw new Error(`Invalid tag: ${words[0]}`);
    }

    const x = parseFloat(words[1]);
    if (isNaN(x)) {
        throw new Error(`Invalid x: ${words[1]}`);
    }
    const y = parseFloat(words[2]);
    if (isNaN(y)) {
        throw new Error(`Invalid y: ${words[2]}`);
    }
    let z = parseFloat(words[3]);
    if (isNaN(z)) {
        // throw new Error(`Invalid z: ${words[3]}`);
        z = 0;
    }
    const nod = new Node(tag, x, y, z);
    nod.addToDomain(myDomain);
}