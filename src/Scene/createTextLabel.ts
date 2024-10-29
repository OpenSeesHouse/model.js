import * as THREE from "three";
export function createTextLabel(text:string, position:THREE.Vector3, fntSize:number, size:number) {
    const canvas = document.createElement('canvas');
    const scaleFac = 10;
    canvas.width = canvas.width*scaleFac;
    canvas.height = canvas.height*scaleFac;
    const context = canvas.getContext('2d');
    if (context == null)
        throw new Error('null 2d context returned for text lable');
    context.scale(scaleFac,scaleFac);
    context.font = `${fntSize}px Arial`;
    context.fillStyle = 'black';
    context.fillText(text, 0, fntSize);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, depthTest: false, depthWrite: false  });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size/2, 1); // Adjust the scale as needed
    sprite.position.copy(position);

    return sprite;
}