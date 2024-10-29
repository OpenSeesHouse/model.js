import { Domain } from '../Domain/Domain'
import { addElement, numNodeMap, allEleCommands } from '../elements/addElement'


export async function importElement(myDomain: Domain, words: string[]) {
    const cmnd = words[0];
    const tag = parseInt(words[1], 10);
    if (isNaN(tag)) {
        throw new Error(`Invalid tag: ${words[0]}`);
    }
    if (!allEleCommands.has(cmnd)) {
        console.log(`Unknown element cmnd: ${cmnd}`);
        return;
    }
    const type = allEleCommands.get(cmnd) ?? "";
    if (type === "")
        throw new Error(`Unknown command: ${cmnd}`);
    const numNodes = numNodeMap.get(type) ?? 0;
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
    if (ele) {
        ele.addToDomain(myDomain);
    } else {
        throw new Error('null element was returned by the asyn routine');
    }

}