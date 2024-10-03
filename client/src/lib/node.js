export class Node {
    constructor(row, col, g = 0, h = 0, parent = null) {
        this.row = row;
        this.col = col;
        this.g = g; // Cost from start to this node
        this.h = h; // Heuristic cost from this node to end
        this.f = g + h; // Total cost
        this.parent = parent; // Parent node in the path
    }
}