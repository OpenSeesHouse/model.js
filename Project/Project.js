import { InitScene } from "../Scene/InitScene.js";
import { importElement } from "./importElement.js";
import { importNode } from "./importNode.js";
// import { setUnits } from "./setUnits.js";
import { parseTextFile } from "./parseTextFile.js";
import { Domain } from "../Domain/Domain.js";
export class Project {
    constructor() { }

    async init(name, projPath, cmndsFileName) {
        this.Name = name;
        this.Domain = new Domain();
        this.Path = projPath;
        this.commandsFile = cmndsFileName;
        const optsFile = `${projPath}/options.json`;
        try {
            const response = await (await fetch(optsFile)).json();
            const backColor = Number(response.backColor);
            if (isNaN(backColor)) {
                throw new Error("Invalid backColor:", response.backColor);
            }
            const gridColor = Number(response.gridColor);
            if (isNaN(gridColor)) {
                throw new Error("Invalid gridColor:", response.gridColor);
            }
            [this.Scene, this.Controls, this.Renderer, this.Camera] = InitScene(
                backColor,
                gridColor,
                response.gridSize,
                response.axesSize
            );
            return this;
        } catch (e) {
            console.log(e);
            throw new Error("Failed to import: ", optsFile);
        }
    }
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.Controls.update();
        this.Renderer.render(this.Scene, this.Camera);
    }
    async importTcl() {
        const cmndsFile = `${this.Path}/${this.commandsFile}`;
        parseTextFile(cmndsFile).then(wordsArray => {
            for (let i = 0; i < wordsArray.length; i++) {
                const words = wordsArray[i];
                if (words.length === 0) continue;
                const firstWord = words[0];
                const remainingWords = words.slice(1);
                switch (firstWord) {
                    case "#Units":
                        // setUnits(this.Domain, remainingWords);
                        break;
                    case "node":
                        importNode(this.Domain, remainingWords);
                        break;
                    case "element":
                        importElement(this.Domain, remainingWords);
                        break;
                    default:
                        // console.log("Unhandled TCL command:", firstWord);
                }
            }
        })
    }
    async addToScene() {
        // console.log(this.Domain)
        await this.Domain.addToScene(this.Scene);
    }
}
