// import { lerp } from '$lib/mathfn.js';

// export class PathManager {
//     constructor(grid) {
//         this.grid = grid;
//         this.path = [];
//         this.relativePositions = [];
//         this.gridPositions = [];
//         this.pathIndex = 0;
//         this.t = 0;
//         this.currentPos = { x: 0, y: 0 };
//         this.speed = 0.01;
//     }

//     // travelPath(deltaTime) {
//     //     if(this.relativePositions.length === 0) return;
//     //     if(this.pathIndex >= this.relativePositions.length - 1) return;
//     //     if (isNaN(deltaTime)) {
//     //         console.error('deltaTime is NaN');
//     //         return;
//     //     }

//     //     // Log initial values for debugging
//     //     console.log('deltaTime:', deltaTime);
//     //     console.log('pathIndex:', this.pathIndex);
//     //     console.log('relativePositions:', this.relativePositions);
//     //     console.log('grid.position:', this.grid.position);

//     //     const startPos = {
//     //         x: this.relativePositions[this.pathIndex].start.x + this.grid.position.x,
//     //         y: this.relativePositions[this.pathIndex].start.y - this.grid.position.y
//     //     };
//     //     const endPos = {
//     //         x: this.relativePositions[this.pathIndex].end.x + this.grid.position.x,
//     //         y: this.relativePositions[this.pathIndex].end.y - this.grid.position.y
//     //     };

//     //     // Log startPos and endPos for debugging
//     //     console.log('startPos:', startPos);
//     //     console.log('endPos:', endPos);

//     //     this.currentPos = lerp(startPos, endPos, this.t);
//     //     this.t += deltaTime * this.speed;

//     //     // Check if t has reached or exceeded 1
//     //     if (this.t >= 1) {
//     //         this.t = 0; // Reset t for the next segment
//     //         this.pathIndex++; // Move to the next segment of the path
//     //         this.currentPos = endPos; // Snap to the end position
//     //     }

//     // // Log currentPos for debugging
//     // console.log('t:', this.t);
//     // console.log('currentPos:', this.currentPos);
//     // }

//     draw(ctx) {
//         if (this.relativePositions.length === 0) return;
//         //console.log('drawing path',this.relativePositions[0]);

//         ctx.strokeStyle = 'blue';
//         ctx.lineWidth = 2;
//         ctx.beginPath();
    
//         // Draw the path
//         for (let i = 0; i < this.relativePositions.length; i++) {
//             const startPos = this.relativePositions[i].start;
//             ctx.moveTo(startPos.x, startPos.y);
    
//             const endPos = this.relativePositions[i].end;
//             ctx.lineTo(endPos.x, endPos.y);
//         }
    
//         ctx.stroke(); // Add parentheses to execute the stroke operation
//         ctx.closePath();
//     }

//     setPlayerMovementPath(path) {
//         this.path = path;
//         this.calculateRelativePositions(path);
//     }

//     calculateRelativePositions() {
//         if (this.path.length === 0) return;

//         this.relativePositions = [];
//         for (let i = 1; i < this.path.length; i++) {
//             const startCell = this.path[i - 1];
//             const endCell = this.path[i];

//             const startPos = this.grid.getCellCenter(startCell.row, startCell.col);
//             const endPos = this.grid.getCellCenter(endCell.row, endCell.col);

//             this.relativePositions.push({ start: startPos, end: endPos });
//         }
//     }

//     clearPlayerMovementPath() {
//         this.path = [];
//         this.relativePositions = [];
//     }
// }