class Cell {
    isAlive = false;

    constructor(x, y) {
        this.position = new Vector(x, y);
    }

    update() {
        if (this.isAlive) {
            this.draw();
        }
    }

    draw() {
        context.fillStyle = "yellow";
        context.fillRect(
            this.position.x * tileSize, // x times the width of the tile
            this.position.y * tileSize, // y times the width of the tile
            tileSize,                   // width
            tileSize                    // height
        );
    }
}