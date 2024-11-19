import { ThreeObject } from '../ThreeObject';
import { Domain } from '../Domain/Domain';
import { Node } from '../Node';
export abstract class Element extends ThreeObject {
  nodeTags: number[];
  args: string[];
  nodes!: Node[];
  constructor(tag: number, nodeTags: number[], args: string[]) {
    super(tag);
    this.nodeTags = nodeTags;
    this.args = args;
  }

  abstract getNumNodes(): number;

  addToDomain(domain: Domain) {
    this.nodes = this.nodeTags.map((tag) => {
      const node = domain.Nodes.get(tag);
      if (!node) {
        throw new Error(`Node not found for tag: ${tag}`);
      }
      return node;
    });
    
    domain.addElement(this);
  }

  private static _allEleCommands: Map<string, string> = new Map([
    ['truss', 'Truss'],
    ['corotTruss', 'CorotTruss'],
    ['elasticBeamColumn', 'ElasticBeamColumn'],
    ['ModElasticBeam2d', 'ModElasticBeam2d'],
    ['ElasticTimoshenkoBeam', 'ElasticTimoshenkoBeam'],
    ['forceBeamColumn', 'ForceBeamColumn'],
    ['dispBeamColumn', 'DispBeamColumn'],
    ['twoNodeLink', 'TwoNodeLink'],
    ['Joint2D', 'Joint2D'],
  ]);
  static get allEleCommands(): Map<string, string> {
    return this._allEleCommands;
  }

  private static _numNodeMap: Map<string, number> = new Map([
    ['Truss', 2],
    ['CorotTruss', 2],
    ['ElasticBeamColumn', 2],
    ['ModElasticBeam2d', 2],
    ['ElasticTimoshenkoBeam', 2],
    ['ForceBeamColumn', 2],
    ['DispBeamColumn', 2],
    ['TwoNodeLink', 2],
    ['Joint2D', 2],
  ]);
  static get numNodeMap(): Map<string, number> {
    return this._numNodeMap;
  }
}
