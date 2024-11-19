import * as THREE from 'three';
import { View, ViewDirection } from './View';
import { Scene } from './Scene';

export abstract class _2dView extends View {
  constructor(canvas: HTMLCanvasElement, scenes: Scene[], dir:ViewDirection) {
    super(canvas, scenes, dir);
  }

  resize(): void {
    this.Renderer.setSize(this.Canvas.width, this.Canvas.height);
  }


}
