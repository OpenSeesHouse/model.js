import * as THREE from 'three';
import { Scene } from './Scene';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export enum ViewDirection {
  X,
  Y,
  Z,
  XYZ,
}
export abstract class View {
  Controls: OrbitControls;
  Canvas: HTMLCanvasElement;
  Camera: THREE.Camera;
  Renderer: THREE.WebGLRenderer;
  scenes: Scene[] = [];
  currentState: number;
  viewDir:ViewDirection;
  constructor(canvas: HTMLCanvasElement, scs: Scene[], dir:ViewDirection) {
    this.Canvas = canvas;
    this.Renderer = new THREE.WebGLRenderer({ canvas: this.Canvas , antialias: true});
    this.Renderer.setSize(this.Canvas.clientWidth, this.Canvas.clientHeight, false);
    this.Renderer.setPixelRatio(window.devicePixelRatio)
    this.scenes = scs;
    this.currentState = 0;
    this.viewDir = dir;
  }
  render(): void {
    this.Renderer.render(
      this.scenes[this.currentState].threeScene,
      this.Camera,
    );
  }

  abstract resize(): void;
  abstract setLook():void;
}
