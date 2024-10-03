// import { Domain } from '../Domain/Domain.js'
import { addElement, numNodeMap, allEleTypes } from '../elements/addElement.js'


export function importElement(myDomain, words) {
    const type = words[0];
    const tag = parseInt(words[1], 10);
    if (isNaN(tag)) {
        throw new Error(`Invalid tag: ${words[0]}`);
    }
    if (!allEleTypes.includes(type)) {
        console.log(`Unknown element type: ${type}`);
        return;
    }
    numNodes = numNodeMap.get(type);
    for (let i = 1; i <= numNodes; i++) {
        const tag = parseInt(words[i+1], 10);
        if (isNaN(tag)) {
            throw new Error(`Invalid node tag: ${words[i+1]}`);
        }
        nodeTags[i-1] = tag; 
    }
    args = words.slice(numNodes+2);
    ele = addElement(type, tag, nodeTags, args);
    ele.addToDomain(myDomain);
}