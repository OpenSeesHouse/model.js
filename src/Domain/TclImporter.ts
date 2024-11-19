import { Domain } from './Domain';
import { ModelImporter } from './ModelImporter';
import { Element, CreateElement } from "../elements";
import { Node } from '../Node';
export class TclImporter extends ModelImporter {
  constructor(filePath: string) {
    super(filePath);
  }
  async importModel(domain: Domain) {
    const wordsArray = await this.parseTextFile(this.filePath);
    for (let i = 0; i < wordsArray.length; i++) {
      let words = wordsArray[i];
      if (words.length === 0) continue;
      const firstWord = words[0];
      words = words.slice(1);
      switch (firstWord) {
        case '#Units':
          domain.units.setFromStr(words[0]);
          break;
        case 'model':
          domain.NDM = Number(words[2]);
          break;
        case 'node':
          const tag = parseInt(words[0], 10);
          if (isNaN(tag)) {
            throw new Error(`Invalid tag: ${words[0]}`);
          }
          const x = parseFloat(words[1]);
          if (isNaN(x)) {
            throw new Error(`Invalid x: ${words[1]}`);
          }
          let y = parseFloat(words[2]);
          if (isNaN(y)) {
            throw new Error(`Invalid y: ${words[2]}`);
          }
          let z = y;
          if (domain.NDM == 3) {
            z = parseFloat(words[3]);
            if (isNaN(z)) {
              throw new Error(`Invalid z: ${words[3]}`);
              // z = 0;
            }
          } else {
            y = 0;
          }
          const nd = new Node(tag, x, y, z);
          nd.addToDomain(domain);
          break;
        case 'element':
          const type = Element.allEleCommands.get(words[0]) ?? "";
          if (type === "")
            throw new Error(`Unknown command: ${words[0]}`);

          const numNodes = Element.numNodeMap.get(type) ?? 0;
          let nodeTags = [];
          for (let i = 1; i <= numNodes; i++) {
            const tag = parseInt(words[i + 1], 10);
            if (isNaN(tag)) {
              throw new Error(`Invalid node tag: ${words[i + 1]}`);
            }
            nodeTags[i - 1] = tag;
          }
          const eletag = parseInt(words[1], 10);
          const args = words.slice(numNodes + 2);
          const ele = CreateElement(type, eletag, nodeTags, args) as Element;
          ele.addToDomain(domain);
          break;
        default:
        // console.log("Unhandled TCL command:", firstWord);
      }
    }
  }
}
