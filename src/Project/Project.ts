import { Domain } from '../Domain/Domain';
import { TclImporter } from '../Domain/TclImporter';

export enum cmndsFileType {
  tcl,
  py,
}
export class Project {
  Name!: string;
  Domain!: Domain;
  Path!: string;
  commandsFile!: string;
  NDM!: number;
  cmndsType: cmndsFileType | null;
  constructor(
    name: string,
    projPath: string,
    cmndsFileName: string,
    cmndsType: cmndsFileType | null,
  ) {
    this.Name = name;
    this.Domain = new Domain();
    this.Path = projPath;
    this.commandsFile = `${this.Path}/${cmndsFileName}`;
    this.NDM = 0;
    this.cmndsType = cmndsType;
  }

  async importModel() {
    if (this.cmndsType === null) {
      const parts = this.commandsFile.split('.');
      if (parts.length <= 1)
        throw new Error('error detecting commands file type');
      const extn = parts.at(-1);
      if (extn === 'tcl') this.cmndsType = cmndsFileType.tcl;
      else if (extn === 'py') this.cmndsType = cmndsFileType.py;
      else throw new Error('error detecting commands file type');
    }
    switch (this.cmndsType) {
      case cmndsFileType.tcl:
        const imprtr = new TclImporter(this.commandsFile);
        await imprtr.importModel(this.Domain);
        break;
      default:
        throw new Error('unsupported commands type');
    }
  }
}
