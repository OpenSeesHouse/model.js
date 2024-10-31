import * as THREE from "three";
import { createTextLabel } from './createTextLabel'
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
export function InitAxes(size: number): [THREE.Group, THREE.Group] {
    const axesGroup = new THREE.Group();
    const labelGroup = new THREE.Group();

    //X-axis
    const xGeometry = new LineGeometry();
    xGeometry.setPositions([
        0, 0, 0,
        size, 0, 0,
    ]);
    const xMaterial = new LineMaterial({
        color: 0xff0000,
        linewidth: 0.02 * size,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight) // Required for linewidth
    });
    const xAxis = new Line2(xGeometry, xMaterial);
    xAxis.material.depthTest = false;
    let unit = new THREE.Vector3(1, 0, 0);
    const arrowSize = 0.2 * size;
    let arrowGeom = new THREE.ConeGeometry(0.2 * arrowSize, arrowSize, size);
    let arrow = new THREE.Mesh(arrowGeom, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    arrow.position.copy(unit.multiplyScalar(size));
    arrow.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2);;
    axesGroup.add(arrow);
    axesGroup.add(xAxis);
    unit.multiplyScalar(1.15)
    createTextLabel('X', unit, size/100, size/5, 0xff0000).then(label => {
        labelGroup.add(label);
    });

    //Y-axis
    const yGeometry = new LineGeometry();
    yGeometry.setPositions([
        0, 0, 0,
        0, size, 0,
    ]);
    const yMaterial = new LineMaterial({
        color: 0x00ff00,
        linewidth: 0.02 * size,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight) // Required for linewidth
    });
    const yAxis = new Line2(yGeometry, yMaterial);
    yAxis.material.depthTest = false;
    unit = new THREE.Vector3(0, 1, 0);
    arrow = new THREE.Mesh(arrowGeom, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    arrow.position.copy(unit.multiplyScalar(size));
    axesGroup.add(arrow);
    axesGroup.add(yAxis);
    unit.multiplyScalar(1.15)
    createTextLabel('Y', unit, size/100, size/5, 0x00ff00).then(label => {
        labelGroup.add(label);
    });


    //Z-axis
    const zGeometry = new LineGeometry();
    zGeometry.setPositions([
        0, 0, 0,
        0, 0, size,
    ]);
    const zMaterial = new LineMaterial({
        color: 0x0000ff,
        linewidth: 0.02 * size,
        resolution: new THREE.Vector2(window.innerWidth, window.innerHeight) // Required for linewidth
    }); // تنظیم ضخامت
    const zAxis = new Line2(zGeometry, zMaterial);
    zAxis.material.depthTest = false;
    unit = new THREE.Vector3(0, 0, 1);
    arrow = new THREE.Mesh(arrowGeom, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    arrow.position.copy(unit.multiplyScalar(size));
    arrow.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);;
    axesGroup.add(arrow);
    axesGroup.add(zAxis);
    unit.multiplyScalar(1.15)
    createTextLabel('Z', unit, size/100, size/5, 0x0000ff).then(label => {
        label.quaternion.setFromAxisAngle (new THREE.Vector3(1, 0, 0), Math.PI/2);
        labelGroup.add(label);
    });

    // axesGroup.rotation.z = Math.PI;
    return [axesGroup, labelGroup];
}
