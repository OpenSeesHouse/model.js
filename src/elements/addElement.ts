import { Truss } from './Truss';
import { CorotTruss } from './CorotTruss';
import { ElasticBeamColumn } from './ElasticBeamColumn';
import { ModElasticBeam2d } from './ModElasticBeam2d';
import { ElasticTimoshenkoBeam } from './ElasticTimoshenkoBeam';
import { ForceBeamColumn } from './ForceBeamColumn';
import { DispBeamColumn } from './DispBeamColumn';
import { TwoNodeLink } from './TwoNodeLink';
import { Joint2D } from './Joint2d';

export const allEleCommands = new Map([
    ['truss', 'Truss'],
    ['corotTruss', 'CorotTruss'],
    ['elasticBeamColumn', 'ElasticBeamColumn'],
    ['ModElasticBeam2d', 'ModElasticBeam2d'],
    ['ElasticTimoshenkoBeam', 'ElasticTimoshenkoBeam'],
    ['forceBeamColumn', 'ForceBeamColumn'],
    ['dispBeamColumn', 'DispBeamColumn'],
    ['twoNodeLink', 'TwoNodeLink'],
    ['Joint2D', 'Joint2D'],
]);

export const numNodeMap = new Map([
    ['Truss', 2],
    ['CorotTruss', 2],
    ['ElasticBeamColumn', 2],
    ['ModElasticBeam2d', 2],
    ['ElasticTimoshenkoBeam', 2],
    ['ForceBeamColumn', 2],
    ['DispBeamColumn', 2],
    ['TwoNodeLink', 2],
    ['Joint2D', 2]
]
);

export async function addElement(eleName:string, tag:number, nodes:number[], args:string[] = [""]) {
    const values = await allEleCommands.values();
    const valsArr = [...values];
    if (!valsArr.includes(eleName)) {
        throw new Error(`Unknown element type: ${eleName}`);
    }
    switch (eleName) {
        case 'Truss':
            return new Truss(tag, nodes, args);
        case 'CorotTruss':
            return new CorotTruss(tag, nodes, args);
        case 'ElasticBeamColumn':
            return new ElasticBeamColumn(tag, nodes, args);
        case 'ModElasticBeam2d':
            return new ModElasticBeam2d(tag, nodes, args);
        case 'ElasticTimoshenkoBeam':
            return new ElasticTimoshenkoBeam(tag, nodes, args);
        case 'ForceBeamColumn':
            return new ForceBeamColumn(tag, nodes, args);
        case 'DispBeamColumn':
            return new DispBeamColumn(tag, nodes, args);
        case 'TwoNodeLink':
            return new TwoNodeLink(tag, nodes, args);
        case 'Joint2D':
            return new Joint2D(tag, nodes, args);
    }
}