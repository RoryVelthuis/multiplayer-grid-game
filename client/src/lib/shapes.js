export class PlayerShape {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
    }

    draw(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, this.radius,  0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

