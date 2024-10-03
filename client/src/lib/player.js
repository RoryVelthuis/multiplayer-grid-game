export class Player {
    constructor(grid, row, col, shape) {
        this.grid = grid;
        this.cell = { row, col, };
        this.position = grid.getCellCenter(row, col);
        this.movementSpeed = 2;
        this.shape = shape;
        // this.visible = true;
    }

    draw(ctx) {
        // if (!this.visible) return;
        this.shape.draw(ctx, this.position.x, this.position.y)
    }

    calculateCellPosition() {
        let relativeX = this.position.x - this.grid.position.x;
        let relativeY = this.position.y - this.grid.position.y;

        let col = Math.floor(relativeX / this.grid.cellSize);
        let row = Math.floor(relativeY / this.grid.cellSize);

        this.cell = { row, col };
        // console.log('Player Cell: ',this.cell);
    }
}