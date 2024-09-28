import { Truss } from './Truss.js';
import { CorotTruss } from './CorotTruss.js';
import { ElasticBeamColumn } from './ElasticBeamColumn.js';
import { ModElasticBeam2d } from './ModElasticBeam2d.js';
import { ElasticTimoshenkoBeam } from './ElasticTimoshenkoBeam.js';
import { ForceBeamColumn } from './ForceBeamColumn.js';
import { DispBeamColumn } from './DispBeamColumn.js';
import { TwoNodeLink } from './TwoNodeLink.js';
import { Joint2D } from './Joint2D.js';

export const allEleTypes = [
    'Truss',
    'CorotTruss',
    'ElasticBeamColumn',
    'ModElasticBeam2d',
    'ElasticTimoshenkoBeam',
    'ForceBeamColumn',
    'DispBeamColumn',
    'TwoNodeLink',
    'Joint2D',
];

export async function addElement(eleName, tag, nodes, args = [""]) {
    if (!allEleTypes.includes(eleName)) {
        throw new Error('Unknown element type: ${eleName}');
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