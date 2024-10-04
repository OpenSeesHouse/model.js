// import { Domain } from '../Domain/Domain.js'
import { addElement, numNodeMap, allEleCommands } from '../elements/addElement.js'


export async function importElement(myDomain, words) {
    const cmnd = words[0];
    const tag = parseInt(words[1], 10);
    if (isNaN(tag)) {
        throw new Error(`Invalid tag: ${words[0]}`);
    }
    if (!allEleCommands.has(cmnd)) {
        console.log(`Unknown element cmnd: ${cmnd}`);
        return;
    }
    const type = await allEleCommands.get(cmnd);
    const numNodes = await numNodeMap.get(type);
    let nodeTags = [];
    for (let i = 1; i <= numNodes; i++) {
        const tag = parseInt(words[i + 1], 10);
        if (isNaN(tag)) {
            throw new Error(`Invalid node tag: ${words[i + 1]}`);
        }
        nodeTags[i - 1] = tag;
    }
    const args = words.slice(numNodes + 2);
    const ele = await addElement(type, tag, nodeTags, args);
    ele.addToDomain(myDomain);

}