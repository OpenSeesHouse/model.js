import { InitScene } from "../Scene/InitScene.js";
import { importElement } from "./importElement.js";
import { importNode } from "./importNode.js";
import { setUnits } from "./setUnits.js";
import { parseTextFile } from "./parseTextFile.js";
import { Domain } from "../Domain/Domain.js";
export class Project {
    constructor(name, projPath, cmndsFileName) {
        this.Name = name;
        this.Domain = new Domain();
        this.Path = projPath;
        this.commandsFile = cmndsFileName;
        const optsFile = `${projPath}/options.json`;
        const dispOpts = fetch(optsFile).then(response => response.json())
            .catch(error => {
                throw new Error("Failed to import: ", optsFile);
            });
        [this.Scene, this.Controls, this.Renderer, this.Camera] =
            InitScene(dispOpts.backColor, dispOpts.gridColor, dispOpts.gridSize, dispOpts.axesSize);
        this.animate();
    }
    animate() {
        requestAnimationFrame(this.animate);
        this.Controls.update();
        this.Renderer.render(this.Scene, this.Camera);
    }
    importTcl() {
        const cmndsFile = `${this.Path}/${this.commandsFile}`;
        const wordsArray = parseTextFile(cmndsFile);
        for (let i = 0; i < wordsArray.length; i++) {
            const words = wordsArray[i];
            const firstWord = words[0];
            const remainingWords = words.slice(1);
            switch (firstWord) {
                case '#Units':
                    // setUnits(this.Domain, remainingWords);
                    break;
                case 'node':
                    importNode(this.Domain, remainingWords);
                    break;
                case 'element':
                    importElement(this.Domain, remainingWords);
                    break;
                default:
                    console.log('Unrecognized TCL command:', firstWord);
            }
        }
    }
    addToScene() {
        this.Domain.addToScene(this.Scene);
    }
}