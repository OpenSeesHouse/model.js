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

export function addElement(eleName, tag, nodes, args = [""]) {
    if (!allEleTypes.includes(eleName)) {
        throw new Error('Unknown element type: ${eleName}');
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