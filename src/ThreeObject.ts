import * as THREE from "three";
import { DomainObject } from "./Domain/DomainObject";
export abstract class ThreeObject extends DomainObject {
    constructor(tag:number) {
        super(tag);
    }

    abstract addToScene(scene:THREE.Scene):void;
    abstract getColor():number;
}

