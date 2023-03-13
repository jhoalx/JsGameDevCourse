const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = canvas.height = 500;
ctx.fillStyle = ctx.strokeStyle = "white";

const explosions = [];

class Explosion {
    constructor(posX, posY) {
        this.sprite = {
            width: 200,
            height: 179,
        }
        this.width = this.sprite.width * 0.5;
        this.height = this.sprite.height * 0.5;
        this.position = {
            x: posX,
            y: posY,
        }
        this.image = new Image();
        this.image.src = "images/boom.png";
        this.audio = new Audio();
        this.audio.src = "audio/boom.wav"
        this.currentFrame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
    }

    update() {
        if(this.currentFrame === 0) this.audio.play();
        this.timer++;
        if (this.timer % 15 === 0) {
            this.currentFrame++;
        }
    }

    draw(context) {
        context.save();
        context.translate(this.position.x, this.position.y)
        context.rotate(this.angle);
        context.drawImage(
            this.image,
            this.sprite.width * this.currentFrame,
            0,
            this.sprite.width,
            this.sprite.height,
            0 - this.width * 0.5,
            0 - this.height * 0.5,
            this.width,
            this.height
        )
        context.restore();
    }
}

window.addEventListener("click", e => {
    createExplosionAnimation(e)
})

// window.addEventListener("mousemove", e => {
//     createExplosionAnimation(e);
// })

function createExplosionAnimation(evt) {
    explosions.push(new Explosion(evt.offsetX, evt.offsetY));

}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    explosions.forEach((explosion, index) => {
        explosion.update();
        explosion.draw(ctx);
        if (explosion.currentFrame > 5) {
            explosions.splice(index, 1)
        }
    })

    requestAnimationFrame(animate);
}

animate();
