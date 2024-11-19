import { Truss } from './Truss';
export class CorotTruss extends Truss {
  constructor(tag: number, nodeTags: number[], args: string[]) {
    super(tag, nodeTags, args);
  }

  getName(): string {
    return 'CorotTruss';
  }
  getColor(): number {
    return 0x00ff00;
  }
}
