import { Element } from './Element';
export abstract class LineElement extends Element {
  constructor(tag: number, nodeTags: number[], args: string[]) {
    super(tag, nodeTags, args);
  }
  getNumNodes() {
    return 2;
  }
}
