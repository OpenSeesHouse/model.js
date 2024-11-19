import { Element } from './Element';
export abstract class QuadElement extends Element {
  constructor(tag: number, nodeTags: number[], args: string[]) {
    super(tag, nodeTags, args);
  }
  getNumNodes(): number {
    return 4;
  }
}
