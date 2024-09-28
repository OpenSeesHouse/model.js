import { Domain } from './domain/Domain.js'
import { Node } from './Node.js'
import { Element } from "./elements/Element.js";
import { addElement } from './elements/addElement.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';// ایجاد صحنه، دوربین و رندر
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// کنترل دوربین
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(50, 50, 50);
controls.update();

// تابع رندر
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}


// ریسایز صفحه
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// // محور‌های X، Y، Z
// const axesHelper = new THREE.AxesHelper(11);
// scene.add(axesHelper);
// ساخت محورها با ضخامت سفارشی
function createThickAxes(size) {
    const axesGroup = new THREE.Group();

    // محور X (قرمز)
    const xGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(size, 0, 0),
    ]);
    const xMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 5,
    }); // تنظیم ضخامت
    const xAxis = new THREE.Line(xGeometry, xMaterial);
    axesGroup.add(xAxis);

    // محور Y (سبز)
    const yGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, size, 0),
    ]);
    const yMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
        linewidth: 5,
    }); // تنظیم ضخامت
    const yAxis = new THREE.Line(yGeometry, yMaterial);
    axesGroup.add(yAxis);

    // محور Z (آبی)
    const zGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, size),
    ]);
    const zMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        linewidth: 5,
    }); // تنظیم ضخامت
    const zAxis = new THREE.Line(zGeometry, zMaterial);
    axesGroup.add(zAxis);

    return axesGroup;
}
// اضافه کردن محورها به صحنه
const thickAxes = createThickAxes(50); // اندازه محورها 50
scene.add(thickAxes);
// چرخش محورها
thickAxes.rotation.y = Math.PI / 2; // چرخش 45 درجه حول محور Y

// شبکه شطرنجی
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);

// Create and add the objects

//Domain
const myDomain = new Domain();
const nd1 = new Node(1, 0, 0, 0);
nd1.addToDomain(myDomain);
const nd2 = new Node(2, 0, 0, 5.0);
nd2.addToDomain(myDomain);

const ele = addElement('ForceBeamColumn', [1, 2]);
console.log(ele instanceof Element);
ele.addToDomain(myDomain);

//add all to scene
myDomain.addToScene(scene);
animate();