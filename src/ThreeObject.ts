import { DomainObject } from './Domain/DomainObject';
import { Scene } from './Graphics/Scene';
export abstract class ThreeObject extends DomainObject {
  constructor(tag: number) {
    super(tag);
  }

  abstract addToScene(scene: Scene, fac:number): void;
  abstract getColor(): number;
}
