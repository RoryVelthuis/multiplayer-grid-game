export class PathManager {
    constructor(grid, player) {
        this.grid = grid;
        this.path = [];
        this.pathCells = [];
        this.player = player;
    }

    setPath(path) {
        this.pathCells = path;
        this.path = path.map(cell => this.grid.getCellCoords(cell));
        console.log(this.path);
    }

    draw(ctx) {
        if (this.path.length === 0) return;
    
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        let centerOffset = this.grid.cellSize / 2;

    
        ctx.beginPath();

        let startCellPos = this.grid.getCellCenter(this.pathCells[0].row, this.pathCells[0].col);
    
        ctx.moveTo(
            startCellPos.x,
            startCellPos.y
        );
        
        for (let i = 1; i < this.path.length; i++) {
            let cellPos = this.grid.getCellCenter(this.pathCells[i].row, this.pathCells[i].col);

            ctx.lineTo(
                cellPos.x,
                cellPos.y
            );
        }
        ctx.stroke();
        ctx.closePath();
    }

    clearPath() {
        this.path = [];
    }
}