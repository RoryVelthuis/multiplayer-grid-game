import { Node } from './node';
import FastPriorityQueue from 'fastpriorityqueue';

function heuristic(a, b) {
    // Manhattan distance
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function octileDistance(a, b) {
    const dx = Math.abs(a.row - b.row);
    const dy = Math.abs(a.col - b.col);
    const F = Math.sqrt(2) - 1;  // Factor for diagonal movement (sqrt(2) - 1)
    return (dx < dy) ? F * dx + dy : F * dy + dx;
}


// The A* algorithm takes the following parameters:
// - grid: the grid object containing the map and obstacles.
// - start: the start node with row and column coordinates.
// - end: the end node with row and column coordinates.

// The grid object should have the following methods:
// - getNeighbors(row, col): returns an array of neighboring nodes.
// - isClosedCell(row, col): checks if the cell is in the closed set.
// - getCell(x, y): returns the row and column of the cell at the given coordinates.
// - getCellCenter(row, col): returns the center coordinates of the cell.


export function astar(grid, start, end) {

    // Initialize the open set as a priority queue
    // The priority queue is a min-heap by default, so we need to modify the comparison function
    // The comparison function is used to determine the priority of elements in the queue
    // Modify the comparison function to break ties by both h (primary) and g (secondary)
    const openSet = new FastPriorityQueue((a, b) => {
        if (a.f === b.f) {
            // Primary tie-breaking: prefer higher h (closer to the goal)
            if (a.h !== b.h) return a.h > b.h;
            // Secondary tie-breaking: prefer higher g (farther from the start)
            return a.g > b.g;
        }
        return a.f < b.f;  // Default to comparing f-cost
    });

    // Initialize the closed set with the grid's closedSet
    const closedSet = new Set(grid.closedSet.map(cell => `${cell.row},${cell.col}`));

    // Create start and end nodes
    const startNode = new Node(start.row, start.col);
    const endNode = new Node(end.row, end.col);

    // Insert the start node into the priority queue
    openSet.add(startNode);

    // Main loop: continue until there are no more nodes to explore
    while (!openSet.isEmpty()) {
        // Get the node with the lowest f-cost
        let currentNode = openSet.poll();

        // If we reached the end node, reconstruct the path
        if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
            const path = [];
            let temp = currentNode;
            while (temp) {
                path.push({ row: temp.row, col: temp.col });
                temp = temp.parent;
            }
            return path.reverse(); // Return the path from start to end
        }

        // Add the current node to the closed set
        closedSet.add(`${currentNode.row},${currentNode.col}`);

        // Get neighbors of the current node
        const neighbors = grid.getNeighbors(currentNode.row, currentNode.col);

        for (let neighbor of neighbors) {
            const neighborKey = `${neighbor.row},${neighbor.col}`;

            // If the neighbor is in the closed set, skip it
            if (closedSet.has(neighborKey)) continue;

            // Check for diagonal movement and prevent corner cutting
            const isDiagonal = Math.abs(neighbor.row - currentNode.row) === 1 && Math.abs(neighbor.col - currentNode.col) === 1;
            if (isDiagonal) {
                const horizontalNeighbor = { row: currentNode.row, col: neighbor.col };
                const verticalNeighbor = { row: neighbor.row, col: currentNode.col };
                if (closedSet.has(`${horizontalNeighbor.row},${horizontalNeighbor.col}`) || closedSet.has(`${verticalNeighbor.row},${verticalNeighbor.col}`)) {
                    continue;
                }
            }

            // Calculate the g-cost and f-cost of the neighbor
            const moveCost = isDiagonal ? 1.4 : 1;  // 1.4 for diagonal, 1 for straight
            const gScore = currentNode.g + moveCost;

            // Check if the neighbor is already in the open set
            let neighborNode = openSet.array.find(node => node.row === neighbor.row && node.col === neighbor.col);
            if (!neighborNode) {
                // If not in the open set, create a new node and add it
                neighborNode = new Node(neighbor.row, neighbor.col, gScore, octileDistance(neighbor, endNode), currentNode);
                openSet.add(neighborNode);
            } else if (gScore < neighborNode.g) {
                // If it's already in the open set, but we found a better path, update it
                neighborNode.g = gScore;
                neighborNode.f = gScore + neighborNode.h;
                neighborNode.parent = currentNode;
                openSet.remove(neighborNode); // Remove the old node
                openSet.add(neighborNode); // Re-add the updated node
            }
        }
    }

    // If no path is found, return an empty array
    return [];
}