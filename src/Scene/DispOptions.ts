export class DispOptions {
    backColor: number;
    gridColor: number;
    gridSize: number;
    axesSize: number;
    ShowNodes: boolean;
    ShowEleTags: boolean;
    ShowNodeTags: boolean;
    NodeSize: number;
    EleTagSize: number;
    NodeTagSize: number;
    constructor(options: { backColor: number; gridColor: number; gridSize: number; axesSize: number; ShowNodes: boolean; ShowEleTags: boolean; ShowNodeTags: boolean; NodeSize: number; EleTagSize: number; NodeTagSize: number; }) {
        this.backColor      = options.backColor;
        this.gridColor      = options.gridColor;
        this.gridSize       = options.gridSize;
        this.axesSize       = options.axesSize;
        this.ShowNodes      = options.ShowNodes;
        this.ShowEleTags    = options.ShowEleTags;
        this.ShowNodeTags   = options.ShowNodeTags;
        this.NodeSize       = options.NodeSize;
        this.EleTagSize     = options.EleTagSize;
        this.NodeTagSize    = options.NodeTagSize;
    }
}
