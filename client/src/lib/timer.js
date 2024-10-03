export class Timer {
    constructor(speed = 1) {
        this.t = 0;
        this.speed = speed;
    }

    update(deltaTime) {
        if (deltaTime) {
            this.t += deltaTime * this.speed;
            if (this.t > 1) {
                this.t = 1;
            }
        }
    }

    reset() {
        this.t = 0;
    }

}