import { Project } from '../Project/Project';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { GraphicsOptions } from './GraphicsOptions';

export class Scene { 
  Project: Project;
  threeScene: THREE.Scene | null;
  size: number;
  Axes: THREE.Group;
  Labels: THREE.Group;
  gridHelper: THREE.GridHelper;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  constructor(project: Project) {
    this.Project = project;
  }

  init(options: GraphicsOptions, nodeBounds: number[], fac: number, rsltn: THREE.Vector2= new THREE.Vector2(1,1)) {
    [this.minX, this.maxX, this.minY, this.maxY, this.minZ, this.maxZ] =
      nodeBounds;
    this.minX = Math.floor(fac * this.minX);
    this.maxX = Math.ceil(fac * this.maxX);
    this.minY = Math.floor(fac * this.minY);
    this.maxY = Math.ceil(fac * this.maxY);
    this.minZ = Math.floor(fac * this.minZ);
    this.maxZ = Math.ceil(fac * this.maxZ);
    this.size = 1 * Math.max(
      Math.abs(this.maxX - this.minX),
      Math.abs(this.maxY - this.minY),
      Math.abs(this.maxZ - this.minZ)
    );

    this.threeScene = new THREE.Scene();
    this.threeScene.background = new THREE.Color(options.backColor);
    THREE.Object3D.DEFAULT_UP.set(0, 0, 1);

    const nGridDivs = Math.ceil(this.size / options.gridSpan);
    this.size = nGridDivs * options.gridSpan;

    this.InitAxes(options.axesSize, rsltn);
    this.Axes.renderOrder = 1;
    this.threeScene.add(this.Axes);
    this.threeScene.add(this.Labels);

    // the horizon
    this.gridHelper = new THREE.GridHelper(
      this.size,
      nGridDivs,
      options.gridColor,
      options.gridColor,
    );
    const posx = Math.round((this.maxX + this.minX) / 2);
    const posy = Math.round((this.maxY + this.minY) / 2);

    this.gridHelper.position.set(posx, posy, 0);
    this.gridHelper.rotation.x = Math.PI / 2;
    this.threeScene.add(this.gridHelper);
  }

  InitAxes(size: number, rsltn: THREE.Vector2) {
    this.Axes = new THREE.Group();
    this.Labels = new THREE.Group();
    const linewidth = 1.5;
    //X-axis
    const xGeometry = new LineGeometry();
    xGeometry.setPositions([0, 0, 0, size, 0, 0]);
    const xMaterial = new LineMaterial({
      color: 0xff0000,
      linewidth: linewidth,
      resolution: rsltn, // Required for linewidth
    });
    const xAxis = new Line2(xGeometry, xMaterial);
    xAxis.material.depthTest = false;
    let unit = new THREE.Vector3(1, 0, 0);
    const arrowSize = 0.2 * size;
    let arrowGeom = new THREE.ConeGeometry(
      0.2 * arrowSize,
      arrowSize,
    );
    let arrow = new THREE.Mesh(
      arrowGeom,
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    );
    arrow.position.copy(unit.multiplyScalar(size));
    arrow.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);
    this.Axes.add(arrow);
    this.Axes.add(xAxis);
    unit.multiplyScalar(1.15);
    Scene.createTextLabel('X', unit, size / 100, size / 5, 0xff0000,).
      then((label) => {
        this.Labels.add(label);
      });

    //Y-axis
    const yGeometry = new LineGeometry();
    yGeometry.setPositions([0, 0, 0, 0, size, 0]);
    const yMaterial = new LineMaterial({
      color: 0x00ff00,
      linewidth: linewidth,
      resolution: rsltn
    });
    const yAxis = new Line2(yGeometry, yMaterial);
    yAxis.material.depthTest = false;
    unit = new THREE.Vector3(0, 1, 0);
    arrow = new THREE.Mesh(
      arrowGeom,
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    arrow.position.copy(unit.multiplyScalar(size));
    this.Axes.add(arrow);
    this.Axes.add(yAxis);
    unit.multiplyScalar(1.15);
    Scene.createTextLabel('Y', unit, size / 100, size / 5, 0x00ff00,).
      then((label) => {
        this.Labels.add(label);
      });

    //Z-axis
    const zGeometry = new LineGeometry();
    zGeometry.setPositions([0, 0, 0, 0, 0, size]);
    const zMaterial = new LineMaterial({
      color: 0x0000ff,
      linewidth: linewidth,
      resolution: rsltn
    });
    const zAxis = new Line2(zGeometry, zMaterial);
    zAxis.material.depthTest = false;
    unit = new THREE.Vector3(0, 0, 1);
    arrow = new THREE.Mesh(
      arrowGeom,
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    );
    arrow.position.copy(unit.multiplyScalar(size));
    arrow.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    this.Axes.add(arrow);
    this.Axes.add(zAxis);
    unit.multiplyScalar(1.15);
    Scene.createTextLabel('Z', unit, size / 100, size / 5, 0x0000ff,).
      then((label) => {
        label.quaternion.setFromAxisAngle(
          new THREE.Vector3(1, 0, 0),
          Math.PI / 2,
        );
        this.Labels.add(label);
      });

  }

  add(obj: THREE.Object3D) {
    this.threeScene.add(obj);
  }

  static createTextLabel(text: string, position: THREE.Vector3, depth: number, size: number, color: number,):
    Promise<THREE.Mesh> {
    return new Promise((resolve, reject) => {
      const loader = new FontLoader();
      const fontUrl = './fonts/Calibri_Regular.json';
      loader.load(
        fontUrl,
        (font) => {
          // Create text geometry
          const textGeometry = new TextGeometry(text, {
            font: font,
            size: size,
            depth: depth,
            curveSegments: 12,
            bevelEnabled: false,
            // bevelThickness: 0.1,
            // bevelSize: 0.05,
            // bevelOffset: 0,
            // bevelSegments: 5
          });
          const textMaterial = new THREE.MeshBasicMaterial({ color: color });
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.copy(position);
          resolve(textMesh);
        },
        undefined,
        (error) => {
          reject(error);
        },
      );
    });
  }
}
