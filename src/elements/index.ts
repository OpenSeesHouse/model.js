import { CorotTruss } from './CorotTruss'
import { DispBeamColumn } from './DispBeamColumn'
import { ElasticBeamColumn } from './ElasticBeamColumn'
import { ElasticTimoshenkoBeam } from './ElasticTimoshenkoBeam'
import { ForceBeamColumn } from './ForceBeamColumn'
import { Joint2D } from './Joint2d'
import { ModElasticBeam2d } from './ModElasticBeam2d'
import { Truss } from './Truss'
import { TwoNodeLink } from './TwoNodeLink'

export * from './Element'
// export * from './CorotTruss'
// export * from './DispBeamColumn'
// export * from './ElasticBeamColumn'
// export * from './ElasticTimoshenkoBeam'
// export * from './ForceBeamColumn'
// export * from './Joint2d'
// export * from './ModElasticBeam2d'
// export * from './Truss'
// export * from './TwoNodeLink'

type ElementCtor<T = {}> = new (tag: number, nodeTags: number[], args: string[]) => T;
const elementClasses: { [key: string]: ElementCtor } = {
  CorotTruss, DispBeamColumn, ElasticBeamColumn, ElasticTimoshenkoBeam, ForceBeamColumn, Joint2D, ModElasticBeam2d, Truss, TwoNodeLink
}

export function CreateElement<T>(type:string, tag: number, nodeTags: number[], args: string[]): T {
  const ClassRef = elementClasses[type];
  if (!ClassRef) {
    throw new Error(`Class ${type} not found`);
  }
  return new ClassRef(tag, nodeTags, args) as T;
}
