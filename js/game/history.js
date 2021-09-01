class History {
    constructor() { }

    new = [];
    old = [];

    addToHistory(reg) {
        if (this.old.length == 0 && this.new.length == 0) {
            this.setNew(reg);
        } else {
            this.setOld();
            this.setNew(reg);
        } 
    }

    check() {
        if (this.old.length != 0 && this.new.length != 0) {
            var counter = 0;
            for (var x = 0; x < this.new.length; x++) {
                for (var y = 0; y < this.new[x].length; y++) {
                    var oldCell = this.old[x][y];
                    var newCell = this.new[x][y];
                    if (newCell.isAlive == oldCell.isAlive) {
                        counter++;
                    }
                }
            }
            if (counter == (tileScale*tileScale)) {
                return true;
            } else {
                return false;
            }
        }
        
    }

    setNew(reg) {
        for (var x = 0; x < reg.length; x++) {
            this.new[x] = [];
            for (var y = 0; y < reg[x].length; y++) {
                this.new[x][y] = new Cell(reg[x][y].position.x, reg[x][y].position.y);
                this.new[x][y].isAlive = reg[x][y].isAlive;
            }
        }
    }

    setOld() {
        for (var x = 0; x < this.new.length; x++) {
            this.old[x] = [];
            for (var y = 0; y < this.new[x].length; y++) {
                this.old[x][y] = new Cell(this.new[x][y].position.x, this.new[x][y].position.y);
                this.old[x][y].isAlive = this.new[x][y].isAlive;
            }
        }
    }

    deleteHistory() {
        this.old = [];
        this.new = [];
    }
}