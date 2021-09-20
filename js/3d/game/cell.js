class Cell {
    isAlive = Math.random() < 0.5 ? true : false;

    constructor(x, y, z) {
        this.position = new Vector3(x, y, z);
        this.position.xProjected = 0; // x coordinate on the 2D world
        this.position.yProjected = 0; // y coordinate on the 2D world

        this.scale = 50;
        this.scaleProjected = 0; // Scale of the element on the 2D world (further = smaller)
    }

    update() {
        if (this.isAlive) {
            this.draw();
        }
    }

    draw() {
        // We first calculate the projected values of our dot
        this.project();
        // We define the opacity of our element based on its distance
        ctx.globalAlpha = Math.abs(1 - this.z / width);
        ctx.fillStyle = "white";
        // We draw a rectangle based on the projected coordinates and scale
        ctx.fillRect(this.position.xProjected - this.scale, this.position.yProjected - this.scale, this.scale * 2 * this.scaleProjected, this.scale * 2 * this.scaleProjected);
    }

    project() {
        // The scaleProjected will store the scale of the element based on its distance from the 'camera'
        this.scaleProjected = PERSPECTIVE / (PERSPECTIVE + this.z);
        // The xProjected is the x position on the 2D world
        this.position.xProjected = (this.x * this.scaleProjected) + PROJECTION_CENTER_X;
        // The yProjected is the y position on the 2D world
        this.position.yProjected = (this.y * this.scaleProjected) + PROJECTION_CENTER_Y;
    }
}