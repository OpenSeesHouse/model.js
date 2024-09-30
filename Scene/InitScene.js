import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';// ایجاد صحنه، دوربین و رندر
import { InitAxes } from "./InitAxes.js";


export function InitScene(backColor, gridColor, gridSize, axesSize) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backColor);
    THREE.Object3D.DefaultUp.set(0, 0, 1);
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
    camera.position.set(-10, -10, 10);
    camera.lookAt(0, 0, 0);
    controls.update();



    // ریسایز صفحه
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    // // محور‌های X، Y، Z
    // const axesHelper = new THREE.AxesHelper(10);
    // scene.add(axesHelper);
    // اضافه کردن محورها به صحنه
    const Axes = InitAxes(axesSize);
    Axes.renderOrder = 1;
    scene.add(Axes);

    
    // شبکه شطرنجی
    const gridHelper = new THREE.GridHelper(gridSize, gridSize, gridColor, gridColor);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    return [scene, controls, renderer, camera];
}