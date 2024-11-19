export enum LengthUnit {
  m = 'm',
  cm = 'cm',
  mm = 'mm',
  in = 'in',
  ft = 'ft',
}

export enum ForceUnit {
  N = 'N',
  kN = 'kN',
  kgf = 'kgf',
  lbF = 'lbf',
  kip = 'kip',
}

export class Units {
  CurLengthUnit: LengthUnit;
  CurForceUnit: ForceUnit;

  constructor(_length: LengthUnit | null, force: ForceUnit | null) {
    if (_length !== null) this.CurLengthUnit = _length;
    if (force !== null) this.CurForceUnit = force;
  }

  get asStr() :string {
    return `${this.CurForceUnit},${this.CurLengthUnit}`;
  }
  setFromStr(word: string) {
    const words = word.split(',');
    const forceUnits = Units.forceFromString(words[0]);
    if (forceUnits === undefined)
      throw new Error(`unknown force unit: ${words[0]}`);
    const lengthUnits = Units.lengthFromString(words[1]);
    if (lengthUnits === undefined)
      throw new Error(`unknown length unit: ${words[1]}`);
    this.CurLengthUnit = lengthUnits;
    this.CurForceUnit = forceUnits;
  }
  static lengthFromString(str: string): LengthUnit | undefined {
    return (Object.values(LengthUnit) as unknown as string[]).includes(str)
      ? (str as LengthUnit)
      : undefined;
  }
  static forceFromString(str: string): ForceUnit | undefined {
    return (Object.values(ForceUnit) as unknown as string[]).includes(str)
      ? (str as ForceUnit)
      : undefined;
  }
  lengthFromArray(vals: number[], from: LengthUnit): number[] {
    let res:number[] = [];
    vals.forEach(val => {
      res.push(this.ConvertLength(val, from))
    });
    return res
  }
  get g(): number {
    return this.ConvertLength(9.81, LengthUnit.m);
  }

  static LengthConvrtFacToM(from: LengthUnit): number {
    switch (from) {
      case LengthUnit.m:
        return 1;
      case LengthUnit.cm:
        return 0.01;
      case LengthUnit.mm:
        return 0.001;
      case LengthUnit.in:
        return 0.0254;
      case LengthUnit.ft:
        return 0.3048;
    }
    return 1;
  }

  static LengthConvrtFac(from: LengthUnit, to: LengthUnit): number {
    const fac1 = Units.LengthConvrtFacToM(from);
    const fac2 = Units.LengthConvrtFacToM(to);
    return fac1 / fac2;
  }

  ConvertLength(val: number, from: LengthUnit): number {
    const to = this.CurLengthUnit;
    const fac = Units.LengthConvrtFac(from, to);
    return val * fac;
  }

  static ConvertLength(val: number, from: LengthUnit, to: LengthUnit): number {
    const fac = Units.LengthConvrtFac(from, to);
    return val * fac;
  }

  static forceConvrtFacToN(from: ForceUnit): number {
    switch (from) {
      case ForceUnit.N:
        return 1;
      case ForceUnit.kN:
        return 1000;
      case ForceUnit.kgf:
        return 9.81; // Assuming g is 9.81 m/s^2
      case ForceUnit.lbF:
        return 0.453592 * 9.81; // Assuming g is 9.81 m/s^2
      case ForceUnit.kip:
        return 4448.2216152605;
    }
    return 1;
  }

  static ForceConvrtFac(from: ForceUnit, to: ForceUnit): number {
    const fac1 = Units.forceConvrtFacToN(from);
    const fac2 = Units.forceConvrtFacToN(to);
    return fac1 / fac2;
  }

  ConvertForce(val: number, from: ForceUnit): number {
    const to = this.CurForceUnit;
    const fac = Units.ForceConvrtFac(from, to);
    return val * fac;
  }

  static ConvertForce(val: number, from: ForceUnit, to: ForceUnit): number {
    const fac = Units.ForceConvrtFac(from, to);
    return val * fac;
  }
}
