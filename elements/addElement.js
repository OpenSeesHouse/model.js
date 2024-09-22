// import { Truss } from './elements/Truss.js';
// import { corotTruss } from './elements/corotTruss.js';
// import { elasticBeamColumn } from './elements/elasticBeamColumn.js';
// import { ModElasticBeam2d } from './elements/ModElasticBeam2d.js';
// import { ElasticTimoshenkoBeam } from './elements/ElasticTimoshenkoBeam.js';
// import { ForceBeamColumn } from './elements/ForceBeamColumn.js';
// import { DispBeamColumn } from './elements/DispBeamColumn.js';
// import { TwoNodeLink } from './elements/TwoNodeLink.js';
// import { joint2D } from './elements/joint2D.js';

export const allEleTypes = [
    'Truss',
    'corotTruss',
    'elasticBeamColumn',
    'ModElasticBeam2d',
    'ElasticTimoshenkoBeam',
    'ForceBeamColumn',
    'DispBeamColumn',
    'TwoNodeLink',
    'joint2D',
];

export async function addElement(eleName, tag, nodes, args = [""]) {
    if (!allEleTypes.includes(eleName)) {
        throw new Error('Unknown element type: ${eleName}');
    }
    const module = await import(`./elements/${eleName}.js`);
    const ClassName = module[className];
    return new ClassName(tag, nodes, args);
}