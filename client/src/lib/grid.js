
export class Grid {
    constructor(x=0, y=0, rows, cols, cellSize) {
        this.position = { x, y };
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
        this.gridSize = { width: cols * cellSize, height: rows * cellSize };
        this.closedSet = [
            { row: 1, col: 1 },
            { row: 1, col: 2 },
            { row: 1, col: 3 },
            { row: 1, col: 4 },
            { row: 1, col: 5 },
            { row: 1, col: 6 },
            { row: 1, col: 7 },
            { row: 1, col: 8 },
            { row: 1, col: 9 },
        ];
    }

    setPosition({x, y}) { this.position = { x, y }; }


    draw(ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;


        ctx.beginPath();
        for (let i = 0; i <= this.rows; i++) {
            ctx.moveTo(this.position.x, this.position.y + i * this.cellSize);
            ctx.lineTo(this.position.x + this.cols * this.cellSize, this.position.y + i * this.cellSize);
        }

        for (let i = 0; i <= this.cols; i++) {
            ctx.moveTo(this.position.x + i * this.cellSize, this.position.y);
            ctx.lineTo(this.position.x + i * this.cellSize, this.position.y + this.rows * this.cellSize);
        }

        ctx.stroke();
        ctx.closePath();

        ctx.fillStyle = 'black';
        this.closedSet.forEach(cell => {
            const x = this.position.x + cell.col * this.cellSize;
            const y = this.position.y + cell.row * this.cellSize;
            ctx.fillRect(x, y, this.cellSize, this.cellSize);
        });
    }

    isClosedCell(row, col) {
        return this.closedSet.some(cell => cell.row === row && cell.col === col);
    }

    getCell(x, y) {
        const col = Math.floor((x - this.position.x) / this.cellSize);
        const row = Math.floor((y - this.position.y) / this.cellSize);
        return { row, col };
    }

    getCellCenter(row, col) {
        const x = this.position.x + col * this.cellSize + this.cellSize / 2;
        const y = this.position.y + row * this.cellSize + this.cellSize / 2;
        return { x, y };
    }

    getCellCoords({row, col}) {
        const x = this.position.x + col * this.cellSize;
        const y = this.position.y + row * this.cellSize;
        return { x, y };
    }

    getNeighbors(row, col) {
        return [
            { row: row - 1, col },     // Up
            { row: row + 1, col },     // Down
            { row, col: col - 1 },     // Left
            { row, col: col + 1 },     // Right
            { row: row - 1, col: col - 1 },  // Diagonal top-left
            { row: row - 1, col: col + 1 },  // Diagonal top-right
            { row: row + 1, col: col - 1 },  // Diagonal bottom-left
            { row: row + 1, col: col + 1 },  // Diagonal bottom-right
        ];
        // const neighbors = [];
        // if (row > 0) neighbors.push({ row: row - 1, col });
        // if (row < this.rows - 1) neighbors.push({ row: row + 1, col });
        // if (col > 0) neighbors.push({ row, col: col - 1 });
        // if (col < this.cols - 1) neighbors.push({ row, col: col + 1 });
        // return neighbors;
    }
}