// import { Domain } from '../Domain/Domain.js'
import { Node } from '../Node.js';


export function importNode(myDomain, words) {
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
    const z = parseFloat(words[3]);
    if (isNaN(z)) {
        throw new Error(`Invalid z: ${words[3]}`);
    }
    const nod = new Node(tag, x, y, z);
    nod.addToDomain(myDomain);
}