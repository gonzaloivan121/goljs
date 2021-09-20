let PERSPECTIVE = width * 0.8; // The field of view of our 3D scene
let PROJECTION_CENTER_X = width / 2; // x center of the canvas
let PROJECTION_CENTER_Y = height / 2; // y center of the canvas

// Store the 2D context
const ctx = canvas.getContext('2d');

let cellArray = []; // Store every particle in this array
let iterationCellArray = [];
let generation = 0;
let gamePaused = true;

let gridSize = 100;
let UPS = 10;
let Interval = 1000 / UPS;
let IntervalID;

startGame();

// GAME LOOP
function startInterval(t) {
    IntervalID = setInterval(() => {
        drawBackground();
        updateCells();
        if (!gamePaused) {
            generation++;
        }
    }, t);
}

function drawBackground() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);
}

function updateCells() {
    if (cellArray.length != 0) {
        for (var x = 0; x < cellArray.length; x++) {
            for (var y = 0; y < cellArray[x].length; y++) {
                for (var z = 0; z < cellArray[x][y].length; z++) {
                    var cell = iterationCellArray[x][y][z];
                    if (!gamePaused) {
                        var aliveCount = countAliveNeighbourCells(cellArray, x, y, z);
                        checkIfCellIsAliveOnNextGeneration(cell, aliveCount);
                    }
                    cell.update();
                }
            }
        }
        swapArrays();
    }
}

function countAliveNeighbourCells(cells, x, y, z) {
    var counter = 0;
    if (cells[x - 1] !== undefined && cells[x - 1][y] !== undefined && cells[x - 1][y][z] !== undefined && cells[x - 1][y][z].isAlive) { // Left
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y] !== undefined && cells[x - 1][y][z - 1] !== undefined && cells[x - 1][y][z - 1].isAlive) { // Left Back
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y] !== undefined && cells[x - 1][y][z + 1] !== undefined && cells[x - 1][y][z + 1].isAlive) { // Left Front
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y - 1] !== undefined && cells[x - 1][y - 1][z] !== undefined && cells[x - 1][y - 1][z].isAlive) { // Top Left
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y - 1] !== undefined && cells[x - 1][y - 1][z - 1] !== undefined && cells[x - 1][y - 1][z - 1].isAlive) { // Top Left Back
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y - 1] !== undefined && cells[x - 1][y - 1][z + 1] !== undefined && cells[x - 1][y - 1][z + 1].isAlive) { // Top Left Front
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y - 1] !== undefined && cells[x][y - 1][z] !== undefined && cells[x][y - 1][z].isAlive) { // Top
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y - 1] !== undefined && cells[x][y - 1][z - 1] !== undefined && cells[x][y - 1][z - 1].isAlive) { // Top Back
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y - 1] !== undefined && cells[x][y - 1][z + 1] !== undefined && cells[x][y - 1][z + 1].isAlive) { // Top Front
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y - 1] !== undefined && cells[x + 1][y - 1][z] !== undefined && cells[x + 1][y - 1][z].isAlive) { // Top Right
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y - 1] !== undefined && cells[x + 1][y - 1][z - 1] !== undefined && cells[x + 1][y - 1][z - 1].isAlive) { // Top Right Back
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y - 1] !== undefined && cells[x + 1][y - 1][z + 1] !== undefined && cells[x + 1][y - 1][z + 1].isAlive) { // Top Right Front
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y] !== undefined && cells[x + 1][y][z] !== undefined && cells[x + 1][y][z].isAlive) { // Right
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y] !== undefined && cells[x + 1][y][z - 1] !== undefined && cells[x + 1][y][z - 1].isAlive) { // Right Back
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y] !== undefined && cells[x + 1][y][z + 1] !== undefined && cells[x + 1][y][z + 1].isAlive) { // Right Front
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y + 1] !== undefined && cells[x + 1][y + 1][z] !== undefined && cells[x + 1][y + 1][z].isAlive) { // Bottom Right
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y + 1] !== undefined && cells[x + 1][y + 1][z - 1] !== undefined && cells[x + 1][y + 1][z - 1].isAlive) { // Bottom Right Back
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y + 1] !== undefined && cells[x + 1][y + 1][z + 1] !== undefined && cells[x + 1][y + 1][z + 1].isAlive) { // Bottom Right Front
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y + 1] !== undefined && cells[x][y + 1][z] !== undefined && cellArray[x][y + 1][z].isAlive) { // Bottom
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y + 1] !== undefined && cells[x][y + 1][z - 1] !== undefined && cellArray[x][y + 1][z - 1].isAlive) { // Bottom Back
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y + 1] !== undefined && cells[x][y + 1][z + 1] !== undefined && cellArray[x][y + 1][z + 1].isAlive) { // Bottom Front
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y + 1] !== undefined && cells[x - 1][y + 1][z] !== undefined && cells[x - 1][y + 1][z].isAlive) { // Bottom Left
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y + 1] !== undefined && cells[x - 1][y + 1][z - 1] !== undefined && cells[x - 1][y + 1][z - 1].isAlive) { // Bottom Left Back
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y + 1] !== undefined && cells[x - 1][y + 1][z + 1] !== undefined && cells[x - 1][y + 1][z + 1].isAlive) { // Bottom Left Front
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y] !== undefined && cells[x][y][z - 1] !== undefined && cells[x][y][z - 1].isAlive) { // Back
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y] !== undefined && cells[x][y][z + 1] !== undefined && cells[x][y][z + 1].isAlive) { // Front
        counter++;
    }
    return counter;
}

function checkIfCellIsAliveOnNextGeneration(c, nAlive) {
    if (!c.isAlive) { // If the cell is dead
        if (nAlive == 3) { // If the cell has 3 alive neighbours
            c.isAlive = true;
        } else {
            c.isAlive = false;
        }
    } else { // If the cell is alive
        if (nAlive == 2 || nAlive == 3) { // If the cell doesn't have 2 or 3 alive neighbours
            c.isAlive = true;
        } else {
            c.isAlive = false;
        }
    }
}

function swapArrays() {
    for (var x = 0; x < iterationCellArray.length; x++) {
        for (var y = 0; y < iterationCellArray[x].length; y++) {
            for (var z = 0; z < iterationCellArray[x][y].length; z++) {
                var cell = iterationCellArray[x][y][z];
                cellArray[x][y][z] = new Cell(cell.position.x, cell.position.y, cell.position.z);
                cellArray[x][y][z].isAlive = cell.isAlive;
            }
        }
    }
}

function startGame() {
    var size = gridSize;
    for (var x = 0; x < size; x++) {
        cellArray[x] = [];
        iterationCellArray[x] = [];
        for (var y = 0; y < size; y++) {
            cellArray[x][y] = [];
            iterationCellArray[x][y] = [];
            for (var z = 0; z < size; z++) {
                cellArray[x][y][z] = new Cell(x, y, z);
                iterationCellArray[x][y][z] = new Cell(x, y, z);
            }
        }
    }
    if (IntervalID === undefined) {
        startInterval(Interval);
    }
}