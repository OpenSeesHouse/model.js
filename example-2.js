import {Project} from './Project/Project.js';

const theProj = new Project("proj-1", 'http://localhost:8000/Examples/frame_2d_project', 'test2d_Commands.tcl');
theProj.importTcl();
theProj.addToScene();
