import { ForceUnit, LengthUnit, Units } from '../Domain/units';
import { Project } from '../Project/Project';
import { GraphicsOptions } from '../Graphics/GraphicsOptions';
import { Scene } from '../Graphics/Scene';
import { Node } from '../Node';
import { View } from '../Graphics/View';
import * as THREE from 'three';

export class workspace {
  projects: Project[] = [];
  views: View[] = [];
  units: Units = new Units(LengthUnit.mm, ForceUnit.N);
  Options: GraphicsOptions;
  Path: string;
  canvases: HTMLCanvasElement[] = [];
  projScenes: Map<Project, Scene[]> = new Map<Project, Scene[]>();
  constructor(path: string) {
    this.Path = path;
  }

  async setOptions() {
    const optsFile = `${this.Path}/options.json`;
    try {
      this.Options = await (await fetch(optsFile)).json();
      const backColor = Number(this.Options.backColor);
      if (isNaN(backColor)) {
        throw new Error(
          `Invalid this.Options.backColor: ${this.Options.backColor}`,
        );
      }
      const gridColor = Number(this.Options.gridColor);
      if (isNaN(gridColor)) {
        throw new Error(`Invalid gridColor: ${this.Options.gridColor}`);
      }
      this.Options.backColor = backColor;
      this.Options.gridColor = gridColor;
      if (this.Options.Units === undefined) {
        this.Options.Units = 'N,m';
      }
      const tmpunits = new Units(null, null);
      tmpunits.setFromStr(this.Options.Units);
      const fac = Units.LengthConvrtFac(tmpunits.CurLengthUnit, this.units.CurLengthUnit);
      this.Options.EleTagSize *= fac;
      this.Options.NodeSize *= fac;
      this.Options.NodeTagSize *= fac;
      this.Options.axesSize *= fac;
      this.Options.gridSpan *= fac;
      Node.size = this.Options.NodeSize;
      this.units.CurForceUnit = tmpunits.CurForceUnit;
      this.Options.Units = this.units.asStr;
    } catch (e) {
      console.log(e);
      throw new Error(`Failed to import: ${optsFile}`);
    }
  }

  animate(): void {
    requestAnimationFrame(() => this.animate());
    this.views.forEach((view) => view.render());
  }

  getScene(proj: Project, state: number): Scene {
    let scene: Scene = null;
    if (this.projScenes.has(proj)) {
      const scs = this.projScenes.get(proj);
      if (scs)
        if (scs.length > state)
          scene = scs[state];
        else
          throw new Error(`unacceptable state number: ${state}; should not exceed: ${scs.length-1}`);
    }

    if (scene === null) {
      scene = new Scene(proj);
      const fac = Units.LengthConvrtFac(proj.Domain.units.CurLengthUnit, this.units.CurLengthUnit);
      scene.init(this.Options, proj.Domain.nodeBounds, fac);

      // const x = fac * (proj.Domain.maxX - proj.Domain.minX)
      // const y = fac * (proj.Domain.maxY - proj.Domain.minY)
      // const z = fac * (proj.Domain.maxZ - proj.Domain.minZ)
      // const x0 = 0.5 * fac * (proj.Domain.maxX + proj.Domain.minX)
      // const y0 = 0.5 * fac * (proj.Domain.maxY + proj.Domain.minY)
      // const z0 = 0.5 * fac * (proj.Domain.maxZ + proj.Domain.minZ)
      // const geometry = new THREE.BoxGeometry(x, y, z);
      // console.log(`THREE.BoxGeometry(${x}, ${y}, ${z})`)
      // const material = new THREE.MeshStandardMaterial({ color: "green" });
      // const cube1 = new THREE.Mesh(geometry, material);
      // cube1.position.set(x0,y0,z0)
      // console.log(`cube1.position.set(${x0},${y0},${z0}`)
      // scene.add(cube1);

      proj.Domain.addToScene(scene, fac);
      this.projScenes.set(proj, [scene]);
    }
    return scene;
  }
}
