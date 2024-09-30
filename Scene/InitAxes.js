import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import {createTextLabel} from './createTextLabel.js'

export function InitAxes(size) {
    const axesGroup = new THREE.Group();

    // محور X (قرمز)
    const xGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(size, 0, 0),
    ]);
    const xMaterial = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth: 10,
    }); // تنظیم ضخامت
    const xAxis = new THREE.Line(xGeometry, xMaterial);
    xAxis.material.depthTest = false;
    axesGroup.add(xAxis);

    // محور Y (سبز)
    const yGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, size, 0),
    ]);
    const yMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff00,
        linewidth: 10,
    }); // تنظیم ضخامت
    const yAxis = new THREE.Line(yGeometry, yMaterial);
    yAxis.material.depthTest = false;
    axesGroup.add(yAxis);

    // محور Z (آبی)
    const zGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, size),
    ]);
    const zMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        linewidth: 10,
    }); // تنظیم ضخامت
    const zAxis = new THREE.Line(zGeometry, zMaterial);
    zAxis.material.depthTest = false;
    axesGroup.add(zAxis);

    // Create and position the labels
    const xLabel = createTextLabel('X', new THREE.Vector3(size, 0, 0), 100);
    const yLabel = createTextLabel('Y', new THREE.Vector3(0, size, 0), 100);
    const zLabel = createTextLabel('Z', new THREE.Vector3(0, 0, size), 100);
    axesGroup.add(xLabel);
    axesGroup.add(yLabel);
    axesGroup.add(zLabel);
    // axesGroup.rotation.z = Math.PI;
    return axesGroup;
}
