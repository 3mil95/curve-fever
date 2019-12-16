

class Snake {
    pos = new Vector(0,0);
    vel = 2;
    angel = 0;
    alive = true;
    
    turnSpeed = 0.1;
    turn = 0;

    line = [];
    lineIndex = -1;
    nextHole;
    holeSizs;

    
    constructor(x,y,ang,color) {
        this.angel = ang
        this.color = color;
        this.pos = new Vector(x,y);
        this.vel = 3;
        this.newLine();
        let newPos = new Vector(this.pos.x, this.pos.y)
        this.line[this.lineIndex].push(newPos);
    }

    startTurn = (dir) => {
        this.turn = dir
    }

    stopTurn = (dir) => {
        if (this.turn === dir) {
            this.turn = 0
        }
    }

    newLine = () => {
        this.line.push([])
        this.nextHole = Math.floor(100 + Math.random() * 50)
        this.holeSizs = Math.floor(10 + Math.random() * 5)
        this.lineIndex++;
    }

    update = () => {
        if (!this.alive) {
            return
        }
        this.angel += this.turnSpeed * this.turn; 
        this.pos.add(new Vector(Math.sin(this.angel) * this.vel,Math.cos(this.angel) * this.vel));
        this.nextHole--;
        if (this.holeSizs <= 0) {
            this.newLine()        
        }
        if (this.nextHole <= 0) {
            this.holeSizs--;
            return
        }
        let newPos = new Vector(this.pos.x, this.pos.y)
        this.line[this.lineIndex].push(newPos);
        this.coilion()
    }

    gameOwer = () =>{
        this.alive = false
        game.addScore()
    }

    coilion = () => {
        if (this.pos.x < 0 || this.pos.x > canvas.width || this.pos.y < 0 || this.pos.y > canvas.height) {
            this.gameOwer()
            return;
        }

        game.snakes.forEach(snake => {
            for (var i = 0; i < snake.line.length; i++) {
                for (var j = 0; j < snake.line[i].length; j++) {
                    if (this === snake && i === snake.line.length-1 && j >= snake.line[i].length - 10) {
                        continue
                    }
                    if (this.pos.dist(snake.line[i][j]) < 18) {
                        this.gameOwer()
                        return;
                    }
                }
            }
        })
    }
}