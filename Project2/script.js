const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 5;
//let gameFrame = 0; //produces jumps when speed changes

const slider = document.getElementById("slider");
slider.value = gameSpeed;
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener("input", (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
})

window.addEventListener('load', () => {
    const backgroundLayer1 = new Image();
    backgroundLayer1.src = "images/layer-1.png";
    const backgroundLayer2 = new Image();
    backgroundLayer2.src = "images/layer-2.png";
    const backgroundLayer3 = new Image();
    backgroundLayer3.src = "images/layer-3.png";
    const backgroundLayer4 = new Image();
    backgroundLayer4.src = "images/layer-4.png";
    const backgroundLayer5 = new Image();
    backgroundLayer5.src = "images/layer-5.png";

    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 700;
            this.image = image;
            this.speedModifier = speedModifier;
            this.speed = gameSpeed * this.speedModifier;
        }

        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }
            this.x = this.x - this.speed;
            // this.x = gameFrame * this.speed % this.width; //produces jumps when speed changes
        }

        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }

    const backgroundLayers = [
        new Layer(backgroundLayer1, 0.06),
        new Layer(backgroundLayer2, 0.12),
        new Layer(backgroundLayer3, 0.25),
        new Layer(backgroundLayer4, 0.5),
        new Layer(backgroundLayer5, 1)
    ]

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        backgroundLayers.forEach(layer => {
            layer.update();
            layer.draw();
        })

        // gameFrame--; //produces jumps when speed changes
        requestAnimationFrame(animate);
    }

    animate();

})
