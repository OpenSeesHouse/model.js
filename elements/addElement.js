import { Truss } from './Truss.js';
import { CorotTruss } from './CorotTruss.js';
import { ElasticBeamColumn } from './ElasticBeamColumn.js';
import { ModElasticBeam2d } from './ModElasticBeam2d.js';
import { ElasticTimoshenkoBeam } from './ElasticTimoshenkoBeam.js';
import { ForceBeamColumn } from './ForceBeamColumn.js';
import { DispBeamColumn } from './DispBeamColumn.js';
import { TwoNodeLink } from './TwoNodeLink.js';
import { Joint2D } from './Joint2D.js';

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

export async function addElement(eleName, tag, nodes, args = [""]) {
    const values = await allEleCommands.values();
    const valsArr = [...values];
    if (!valsArr.includes(eleName)) {
        throw new Error(`Unknown element type: ${eleName}`);
    }
    switch (eleName) {
        case 'Truss':
            return new Truss(tag, nodes[0], nodes[1], args);
        case 'CorotTruss':
            return new CorotTruss(tag, nodes[0], nodes[1], args);
        case 'ElasticBeamColumn':
            return new ElasticBeamColumn(tag, nodes[0], nodes[1], args);
        case 'ModElasticBeam2d':
            return new ModElasticBeam2d(tag, nodes[0], nodes[1], args);
        case 'ElasticTimoshenkoBeam':
            return new ElasticTimoshenkoBeam(tag, nodes[0], nodes[1], args);
        case 'ForceBeamColumn':
            return new ForceBeamColumn(tag, nodes[0], nodes[1], args);
        case 'DispBeamColumn':
            return new DispBeamColumn(tag, nodes[0], nodes[1], args);
        case 'TwoNodeLink':
            return new TwoNodeLink(tag, nodes[0], nodes[1], args);
        case 'Joint2D':
            return new Joint2D(tag, nodes[0], nodes[1], nodes[2], nodes[3], args);
    }
}