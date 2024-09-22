import { Domain } from "./Domain";
export class DomainObject {
    constructor(tag) {
        if (this.constructor === DomainObject) {
            throw new Error("Abstract export classes can't be instantiated.");
        }
        this.tag = tag;
    }

    getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }

    addToDomain(domain) {
        throw new Error("Method 'addToDomain()' must be implemented.");
    }

    update() {
        throw new Error("Method 'update()' must be implemented.");
    }
}

