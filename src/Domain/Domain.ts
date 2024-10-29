import * as THREE from "three";
import { Node } from "../Node";
import { Element } from "../elements/Element";
export class Domain {
  Nodes: Map<number, Node>;
  Elements: Map<number, Element>;
  // UniaxialMaterials: Map<number,UniaxialMaterial>;
  // NDMaterials: Map<number,NDMaterial>;
  // Sections: Map<number,Section>;
  // Patterns: Map<number,Pattern>;
  // Recorders: Map<number,Recorder>;
  constructor() {
    this.Nodes = new Map<number, Node>();
    this.Elements = new Map<number, Element>();
    // this.UniaxialMaterials = new Map();
    // this.NDMaterials = new Map();
    // this.Sections = new Map();
    // this.Patterns = new Map();
    // this.Recorders = new Map();
  }
  update() {
    for (let obj of this.Nodes.values()) obj.update();
    for (let obj of this.Elements.values()) obj.update();
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
  }
  addElement(ele: Element) {
    if (this.Elements.has(ele.tag))
      throw new Error(`Element with tag ${ele.tag} already exists in Domain`);
    this.Elements.set(ele.tag, ele);
  }

  addToScene(scene: THREE.Scene) {
    for (let nd of this.Nodes.values()) {
    //   console.log(nd);
      // console.log("nd.addToScene(scene)");
      nd.addToScene(scene);
    }
    for (let ele of this.Elements.values()) {
      ele.addToScene(scene);
    }
  }

  static setNodeSize(size: number) {
    Node.size = size;
  }
  getNodeBounds() {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;

    // Iterate through the Map
    for (let node of this.Nodes.values()) {
      if (node.position.x > maxX) maxX = node.position.x;
      else if (node.position.x < minX) minX = node.position.x;
      if (node.position.y > maxY) maxY = node.position.y;
      else if (node.position.y < minY) minY = node.position.y;
      if (node.position.z > maxZ) maxZ = node.position.z;
      else if (node.position.z < minZ) minZ = node.position.z;
    }
    return [minX, minY, minZ, maxX, maxY, maxZ];
  }
}
