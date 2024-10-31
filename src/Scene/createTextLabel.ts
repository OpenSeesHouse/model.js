import * as THREE from "three";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
export function createTextLabel(text: string, position: THREE.Vector3, depth: number, size: number, color: number): Promise<THREE.Mesh> {
    return new Promise((resolve, reject) => {
        const loader = new FontLoader();
        const fontUrl = './fonts/Calibri_Regular.json';
        loader.load(fontUrl, (font) => {
            // Create text geometry
            const textGeometry = new TextGeometry(text, {
                font: font,
                size: size,
                depth: depth,
                curveSegments: 12,
                bevelEnabled: false,
                // bevelThickness: 0.1,
                // bevelSize: 0.05,
                // bevelOffset: 0,
                // bevelSegments: 5
            });
            const textMaterial = new THREE.MeshBasicMaterial({ color: color });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            textMesh.position.copy(position);
            resolve(textMesh);
        }, undefined, (error) => {
            reject(error);
        });
    });
}
