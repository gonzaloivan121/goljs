var context = golCanvas.getContext("2d");
var canvasWidth = context.canvas.clientWidth;
var canvasHeight = context.canvas.clientHeight;
var tileScale = 50;
var tileSize = canvasWidth / tileScale;
var tileCount = canvasWidth / tileSize;

var UPS = 7;
var Interval = 1000 / UPS;
var IntervalID;
//var Interval = 1000/60; // 60 times a second

var cellArray = [];
var iterationCellArray = [];
var gameHistory = new History();
var generation = 0;
var gamePaused = true;
var gameEnded = false;





function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left).map(0, canvasWidth, 0, tileCount));
    const y = Math.floor((event.clientY - rect.top).map(0, canvasWidth, 0, tileCount));

    if (gamePaused) {
        changeCellState(x,y);
    }
}

function changeCellState(posX, posY) {
    for (var x = 0; x < iterationCellArray.length; x++) {
        for (var y = 0; y < iterationCellArray[x].length; y++) {
            var ci = iterationCellArray[x][y];
            if (ci.position.x == posX && ci.position.y == posY) {
                ci.isAlive = !ci.isAlive;

            }
        }
    }
}

var upsRange = document.getElementById("ups-range");
var tileSizeRange = document.getElementById("tile-size-range");
upsRange.value = UPS;
tileSizeRange.value = tileScale;

upsRange.addEventListener('input', () => {
    updateUPS(upsRange.value)
}, false);

tileSizeRange.addEventListener('input', () => {
    updateTileScale(tileSizeRange.value)
}, false);

startGame();

// GAME LOOP
function startInterval(t) {
    IntervalID = setInterval(() => {
        drawBackground();
        if (!gamePaused) {
            saveGameHistory();
        }
        updateCells();
        setup();
        updateUI();
        if (!gamePaused) {
            generation++;
            checkHistory();
        }
    }, t);
}

function updateUPS(val) {
    UPS = parseInt(val);
    Interval = 1000 / UPS;
    clearInterval(IntervalID);
    startInterval(Interval);
}

function updateTileScale(val) {
    tileScale = parseInt(val);
    tileSize = canvasWidth / tileScale;
    tileCount = canvasWidth / tileSize;    
}

function updateUI() {
    document.getElementById("generation").innerHTML = generation;
}

function drawBackground() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvasWidth, canvasWidth);
}

function updateCells() {
    if (cellArray.length != 0) {
        for (var x = 0; x < cellArray.length; x++) {
            for (var y = 0; y < cellArray[x].length; y++) {
                var cell = iterationCellArray[x][y];
                if (!gamePaused) {
                    var aliveCount = countAliveNeighbourCells(cellArray, x, y);
                    checkIfCellIsAliveOnNextGeneration(cell, aliveCount);
                }
                cell.update();
            }
        }
        swapArrays();
    }
}

function saveGameHistory() {
    gameHistory.addToHistory(cellArray, generation);
}

function checkHistory() {
    if (gameHistory.check()) {
        pauseGame();
        showGameEndedAlert();
    }
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

function countAliveNeighbourCells(cells, x, y) {
    var counter = 0;
    if (cells[x - 1] !== undefined && cells[x - 1][y] !== undefined && cells[x - 1][y].isAlive) { // Left
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y - 1] !== undefined && cells[x - 1][y - 1].isAlive) { // Top Left
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y - 1] !== undefined && cells[x][y - 1].isAlive) { // Top
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y - 1] !== undefined && cells[x + 1][y - 1].isAlive) { // Top Right
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y] !== undefined && cells[x + 1][y].isAlive) { // Right
        counter++;
    }
    if (cells[x + 1] !== undefined && cells[x + 1][y + 1] !== undefined && cells[x + 1][y + 1].isAlive) { // Bottom Right
        counter++;
    }
    if (cells[x] !== undefined && cells[x][y + 1] !== undefined && cellArray[x][y + 1].isAlive) { // Bottom
        counter++;
    }
    if (cells[x - 1] !== undefined && cells[x - 1][y + 1] !== undefined && cells[x - 1][y + 1].isAlive) { // Bottom Left
        counter++;
    }
    return counter;
}

function swapArrays() {
    for (var y = 0; y < iterationCellArray.length; y++) {
        for (var x = 0; x < iterationCellArray[y].length; x++) {
            var cell = iterationCellArray[x][y];
            cellArray[x][y] = new Cell(cell.position.x, cell.position.y);
            cellArray[x][y].isAlive = cell.isAlive;
        }
    }
}

function setup() {
    context.fillStyle = "#252525";
    for (var x = tileSize; x < canvasWidth; x += tileSize) {
        context.fillRect(x, 0, 1, canvasWidth);
    }

    for (var y = tileSize; y < canvasWidth; y += tileSize) {
        context.fillRect(0, y, canvasWidth, 1);
    }

    context.fillStyle = "#ffffff50";
    for (var x = 0; x < canvasWidth; x += (tileSize*10)) {
        context.fillRect(x, 0, 1, canvasWidth);
    }

    for (var y = 0; y < canvasWidth; y += tileSize *10) {
        context.fillRect(0, y, canvasWidth, 1);
    }

    context.fillStyle = "white";
    context.fillRect(canvasWidth - 1, 0, 1, canvasWidth); // Right border
    context.fillRect(0, canvasWidth - 1, canvasWidth, 1); // Bottom border
    context.fillRect(0, 0, 1, canvasWidth);              // Left border
    context.fillRect(0, 0, canvasWidth, 1);              // Top border
}

function startGame() {
    for (var x = 0; x < tileCount; x++) {
        cellArray[x] = [];
        iterationCellArray[x] = [];
        for (var y = 0; y < tileCount; y++) {
            cellArray[x][y] = new Cell(x, y);
            iterationCellArray[x][y] = new Cell(x, y);
        }
    }
    if (IntervalID === undefined) {
        startInterval(Interval);
    }
}

function pauseGame() {
    gamePaused = !gamePaused;
}

function resetGame() {
    generation = 0;
    gameHistory.deleteHistory();
    updateTileScale(50);
    startGame();
    gamePaused = true;
}

function downloadGameState() {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cellArray));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "state.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function uploadGameState() {
    console.log("Loading Saved Game")
}
