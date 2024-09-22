export class ThreeObject extends DomainObject {
    constructor(tag) {
        super(tag);
        if (this.constructor === ThreeObject) {
            throw new Error("Abstract export classes can't be instantiated.");
        }
    }

    addToScene(scene) {
        throw new Error("Method 'addToScene()' must be implemented.");
    }
    getColor() {
        throw new Error("Abstract method!");
    }
}

