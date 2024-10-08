import { InitScene } from "../Scene/InitScene.js";
import { importElement } from "./importElement.js";
import { importNode } from "./importNode.js";
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
        this.Scene = null;
        this.Controls = null;
        this.Renderer = null;
        this.Camera = null;
        this.NDM = 0;
        try {
            this.options = await (await fetch(optsFile)).json();
            const backColor = Number(this.options.backColor);
            if (isNaN(backColor)) {
                throw new Error("Invalid backColor:", this.options.backColor);
            }
            const gridColor = Number(this.options.gridColor);
            if (isNaN(gridColor)) {
                throw new Error("Invalid gridColor:", this.options.gridColor);
            }
            this.options.backColor = backColor;
            this.options.gridColor = gridColor;
            if (this.options.Units === undefined) {
                await this.setUnits('N,m');
                this.options.Units = "N,m";
            } else {
                await this.setUnits(this.options.Units);
            }
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
        const wordsArray = await parseTextFile(cmndsFile);
        for (let i = 0; i < wordsArray.length; i++) {
            const words = wordsArray[i];
            if (words.length === 0) continue;
            const firstWord = words[0];
            const remainingWords = words.slice(1);
            switch (firstWord) {
                case "#Units":
                    await this.setUnits(remainingWords[0]);
                    break;
                case "model":
                    this.NDM = Number(remainingWords[2]);
                    break;
                case "node":
                    importNode(this.Domain, remainingWords);
                    break;
                case "element":
                    await importElement(this.Domain, remainingWords);
                    break;
                default:
                // console.log("Unhandled TCL command:", firstWord);
            }
        }
    }

    async setUnits(word) {
        const words = word.split(',');
        this.ForceUnits = words[0];
        this.LengthUnits = words[1];
        const fac = await this.getLengthFac();
        this.options.gridSize =  40/fac;
        this.options.nGridDivs =  40;
        this.options.axesSize =  1/fac;
        this.options.NodeSize =  0.2/fac;
        this.options.EleTagSize = 0.2/fac;
        this.options.NodeTagSize = 0.2/fac;
    }

    async getLengthFac() {
        switch (this.LengthUnits) {
            case 'm':
                return 1;
            case "cm":
                return 0.01;
            case 'mm':
                return 0.001;
            case 'in':
                return 0.0254;
            case 'ft':
                return 0.3048;
            default:
                throw new Error("Unhandled length units: ", this.LengthUnits);
        }
    }
    async addToScene() {
        if (this.Scene === null) {
            Domain.setNodeSize(this.options.NodeSize);
            [this.Scene, this.Controls, this.Renderer, this.Camera] = InitScene(
                this.options.backColor,
                this.options.gridColor,
                this.options.gridSize,
                this.options.nGridDivs,
                this.options.axesSize,
                this.NDM
            );

        }
        await this.Domain.addToScene(this.Scene);
    }
}
