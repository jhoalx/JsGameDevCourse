/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 20;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor(x, y, width, height) {
        this.image = new Image();
        this.image.src = "images/enemy2.png";
        this.speed = Math.random() * 2 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 1;
        this.flapSpeed = Math.floor(Math.random() * 5 + 2);
        // this.angle = Math.random() * 4 - 2;
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.05;
        this.curve = Math.random() * 5;
    }

    update() {
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed ;

        if(this.x + this.width < 0) this.x = CANVAS_WIDTH;

        //animate sprite
        if(gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0: this.frame++;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height,)
    }
}



for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy(0,0,100,100));
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    })

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();