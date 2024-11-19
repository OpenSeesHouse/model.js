import * as THREE from 'three';

// Get the canvas elements from the DOM
const canvas3 = document.getElementById('canvas1') as HTMLCanvasElement;

// Create the renderers and set their sizes
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3, antialias: true });
renderer3.setPixelRatio(window.devicePixelRatio);
const width = window.innerWidth;
const height = window.innerHeight;
renderer3.setSize(width, height);
renderer3.setClearColor('black'); // Slightly darker grey background

// Create scenes and cameras for each renderer
const scene1 = new THREE.Scene();
// scene1.background = new THREE.Color(0x00ffff);
const x = 2, y = 4, z = 1;
const aspect = width / height;
const camera3 = new THREE.OrthographicCamera(-aspect * 5, aspect * 5, 5, -5, 0.1, 1000);

const dist = 10;
camera3.position.set(dist, 0, 0);
camera3.lookAt(0, 0, 0);
// camera3.position.set(dist, z/2, y/2);
// camera3.lookAt(0, z/2, y/2);

// Add a cube to each scene
const geometry = new THREE.BoxGeometry(x, y, z);
const materials = [
new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow
new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cyan
];
const cube1 = new THREE.Mesh(geometry, materials);
scene1.add(cube1);

// Add lights to each scene
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(5, 5, 5).normalize();
scene1.add(light1);

camera3.updateProjectionMatrix();

// Animation loop
function animate() {
requestAnimationFrame(animate);
renderer3.render(scene1, camera3);
}

animate();
