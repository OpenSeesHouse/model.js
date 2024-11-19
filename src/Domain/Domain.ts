import { Node } from "../Node";
import { Element } from "../elements/Element";
import { ForceUnit, LengthUnit, Units } from "./units";
import { Scene } from "../Graphics/Scene";

export class Domain {
  NDM: number;
  units: Units
  Nodes: Map<number, Node>;
  Elements: Map<number, Element>;
  theSize: number = 0;
  maxX: number = -Infinity;
  maxY: number = -Infinity;
  maxZ: number = -Infinity;
  minX: number = Infinity;
  minY: number = Infinity;
  minZ: number = Infinity;
  // UniaxialMaterials: Map<number,UniaxialMaterial>;
  // NDMaterials: Map<number,NDMaterial>;
  // Sections: Map<number,Section>;
  // Patterns: Map<number,Pattern>;
  // Recorders: Map<number,Recorder>;
  constructor() {
    this.Nodes = new Map<number, Node>();
    this.Elements = new Map<number, Element>();
    this.units = new Units(LengthUnit.m, ForceUnit.N);
    // this.UniaxialMaterials = new Map();
    // this.NDMaterials = new Map();
    // this.Sections = new Map();
    // this.Patterns = new Map();
    // this.Recorders = new Map();
  }
  update(fac:number) {
    for (let obj of this.Nodes.values()) obj.update(fac);
    for (let obj of this.Elements.values()) obj.update(fac);
    // for (let obj of this.UniaxialMaterials.values()) obj.update();
    // for (let obj of this.NDMaterials.values()) obj.update();
    // for (let obj of this.Sections.values()) obj.update();
    // for (let obj of this.Patterns.values()) obj.update();
    // for (let obj of this.Recorders.values()) obj.update();
  }
  wipe() {
    this.Nodes.clear();
    this.Elements.clear();
    // this.UniaxialMaterials.clear();
    // this.NDMaterials.clear();
    // this.Sections.clear();
    // this.Patterns.clear();
    // this.Recorders.clear();
  }

  addNode(node: Node) {
    if (this.Nodes.has(node.tag))
      throw new Error(`Node with tag ${node.tag} already exists in Domain`);
    // console.log(`this.Nodes.set(${Node.tag}, ${Node})`)
    this.Nodes.set(node.tag, node);
    if (node.position.x > this.maxX) this.maxX = node.position.x;
    else if (node.position.x < this.minX) this.minX = node.position.x;
    if (node.position.y > this.maxY) this.maxY = node.position.y;
    else if (node.position.y < this.minY) this.minY = node.position.y;
    if (node.position.z > this.maxZ) this.maxZ = node.position.z;
    else if (node.position.z < this.minZ) this.minZ = node.position.z;
  }
  addElement(ele: Element) {
    if (this.Elements.has(ele.tag))
      throw new Error(`Element with tag ${ele.tag} already exists in Domain`);
    this.Elements.set(ele.tag, ele);
  }

  addToScene(scene: Scene, fac:number) {
    for (let nd of this.Nodes.values()) {
      //   console.log(nd);
      // console.log("nd.addToScene(scene)");
      nd.addToScene(scene, fac);
    }
    for (let ele of this.Elements.values()) {
      ele.addToScene(scene, fac);
    }
  }

  get nodeBounds(): number[] {
    return [this.minX, this.maxX, this.minY, this.maxY, this.minZ, this.maxZ];
  }

  get size(): number {
    if (this.theSize !== 0)
      return this.theSize;
    this.nodeBounds.forEach(val =>
      this.theSize = Math.max(this.theSize, Math.abs(val))
    );
    return this.theSize;
  }

}
