class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static up = new Vector(0, -1); // Inverted because canvas
    static down = new Vector(0, 1); // Inverted because canvas
    static forward = new Vector(1, 0);
    static backward = new Vector(-1, 0);
}