/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 50;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor(x, y, width, height) {
        this.image = new Image();
        this.image.src = "images/enemy3.png";
        this.speed = Math.random() * 2 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.frame = 1;
        this.flapSpeed = Math.floor(Math.random() * 5 + 2);
        // this.angle = Math.random() * 4 - 2;
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.5 + 0.5;
        // this.curve = Math.random() * 200 + 50;
    }

    update() {
        // this.x -= this.speed;
        // this.y += this.curve * Math.sin(this.angle);
        this.x = CANVAS_WIDTH / 2 * Math.sin(this.angle * Math.PI / 70) + (CANVAS_WIDTH / 2 - this.width / 2);
        this.y = CANVAS_HEIGHT / 2 * Math.sin(this.angle * Math.PI / 220) + (CANVAS_HEIGHT / 2 - this.height / 2);

        this.angle += this.angleSpeed;

        if (this.x + this.width < 0) this.x = CANVAS_WIDTH;

        //animate sprite
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height,)
    }
}


for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy(0, 0, 100, 100));
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