import { Domain } from './Domain';
export abstract class DomainObject {
  tag: number;
  constructor(tag: number) {
    this.tag = tag;
  }

  abstract getName(): string;

  abstract addToDomain(domain: Domain): void;

  abstract update(fac:number): void;
}
