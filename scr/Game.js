const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
ctx.lineWidth = 20;
ctx.fillStyle = "#ffffff"

players = [];
players.push({name:"red", color:'#ff0000', left:null, right:null})
players.push({name:"green", color:'#00ff00', left:null, right:null })
players.push({name:"blue", color:'#0000ff', left:null, right:null})
players.push({name:"green", color:'#ffff00', left:null, right:null})
players.push({name:"blue", color:'#00ffff', left:null, right:null})
players.push({name:"red", color:'#ff00ff', left:null, right:null})
const controls = new Map();

class Game {
    playing = false;
    played = null;
    snakes = [];
    score = [];

    constructor() {
        showStart(players)
    }

    start = () => {
        let index = 0
        setStartVisible(false)
        players.forEach((player) => {
            if (player.left === null || player.right === null) {
                return;
            }
            this.snakes.push(this.initSnake(player.color))
            this.score.push({name:player.name, color:player.color, score:0})
            showScore(this.score)
            controls.set(player.left, [index, 1])
            controls.set(player.right, [index, -1])
            index++
        });
    }

    restart = () => {
        this.snakes = []
        players.forEach((player,i) => {
            if (player.left === null || player.right === null) {
                return;
            }
            this.snakes.push(this.initSnake(player.color))
        });
    }

    initSnake = (color) => {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
        let ang = Math.random() * 360;
        return new Snake(x,y,ang,color)
    }

    starGame = () => {
        if (this.played === null) {
            this.played = false
            this.start()
            return;
        }
        if (this.played) {
            this.restart()
            this.played = false
            return;
        }
        this.playing = true;
    }

    update = () => {
        this.snakes.forEach(snake => {
            snake.update();
        })
        this.allDead()
    }

    allDead = () => {
        let numAlive = 0;
        this.snakes.forEach(snake => {
            if (snake.alive === true) {
                numAlive++
            } 
        })
        if (numAlive <= 1) {
            this.played = true
            this.playing = false
        }  
    }

    addScore() {
        this.snakes.forEach((snake,i) => {
            if (snake.alive === true) {
                this.score[i].score++
            }
        })
        console.log(this.score)
        showScore(this.score)
    }

    draw = () => {
        this.snakes.forEach(snake => {
            drawSnake(snake);
        })
    }

}

const game = new Game()

var contPlayer = null;
var contDir = null;

document.addEventListener('keyup', (e) => {
    const act = controls.get(e.keyCode)
    game.snakes[act[0]].stopTurn(act[1])
})

document.addEventListener('keydown', (e) => {
    if (contPlayer !== null) {
        setControls(e)
        return
    }
    if (e.keyCode == 32) {
        game.starGame()
        return
    }
    console.log(e.keyCode)
    const act = controls.get(e.keyCode)
    game.snakes[act[0]].startTurn(act[1])
})

function setEdeting(player, dir)  {
    contPlayer = player
    contDir = dir
    console.log(players)
}

function setControls(e) {
    if (contDir === "left") {
        players[contPlayer].left = e.keyCode
    } else {
        players[contPlayer].right = e.keyCode
    }   
    contPlayer = null;
    contDir = null;
    showStart(players)
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!game.playing) {
        game.draw();
        return
    }
    game.update()
    game.draw();
}

function drawSnake(snake) {
    
    ctx.strokeStyle = snake.color;
    snake.line.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line[0].x, line[0].y)
        for (i = 1; i < line.length; i++) {
            ctx.lineTo(line[i].x, line[i].y)
        }
        ctx.stroke();
    });
    ctx.beginPath();
    ctx.arc(snake.pos.x, snake.pos.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

setInterval(gameLoop, 30);
