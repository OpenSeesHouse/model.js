import { Domain } from './Domain/Domain.js'
import { Node } from './Node.js'
import { InitScene } from './Scene/InitScene.js'

import {addElement} from './elements/addElement.js';

const backColor = 0xf0f0f0;
const gridColor = 0x888888;
const gridSize = 40;
const axesSize = 5;
const [scene, controls, renderer, camera] = InitScene(backColor, gridColor, gridSize, axesSize);
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Create and add the objects

//Domain
const myDomain = new Domain();
const nd1 = new Node(1, 0, 0, 0);
nd1.addToDomain(myDomain);
const nd2 = new Node(2, 5.0, 5.0, 0);
nd2.addToDomain(myDomain);

const ele = addElement('CorotTruss', 1, [1, 2]);
ele.addToDomain(myDomain);

//add all to scene
myDomain.addToScene(scene);


