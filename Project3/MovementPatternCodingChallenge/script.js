/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");

canvas.height = canvas.width = 450;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "red";
ctx.lineWidth = 20;
ctx.font = "30px Consolas"


// @formatter:off
const AnimFrames = {
    0: { _x: "21"  , _y: "6"   , _w: "78", _h: "86" },
    1: { _x: "21"  , _y: "102" , _w: "78", _h: "84" },
    2: { _x: "21"  , _y: "196" , _w: "78", _h: "79" },
    3: { _x: "109" , _y: "196" , _w: "78", _h: "79" },
    4: { _x: "109" , _y: "102" , _w: "78", _h: "84" },
    5: { _x: "109" , _y: "6"   , _w: "78", _h: "86" },
    6: { _x: "197" , _y: "6"   , _w: "78", _h: "86" },
    7: { _x: "197" , _y: "102" , _w: "78", _h: "84" },
    8: { _x: "197" , _y: "196" , _w: "78", _h: "79" },
    9: { _x: "285" , _y: "196" , _w: "78", _h: "79" },
    10: { _x: "285" , _y: "102" , _w: "77", _h: "84" },
    11: { _x: "285" , _y: "6"   , _w: "78", _h: "86" },
    12: { _x: "285" , _y: "309" , _w: "78", _h: "86" },
    13: { _x: "285" , _y: "405" , _w: "77", _h: "84" },
    14: { _x: "285" , _y: "499" , _w: "78", _h: "79" },
    15: { _x: "197" , _y: "499" , _w: "78", _h: "79" },
    16: { _x: "197" , _y: "405" , _w: "78", _h: "84" },
    17: { _x: "197" , _y: "309" , _w: "78", _h: "86" },
    18: { _x: "109" , _y: "309" , _w: "78", _h: "86" },
    19: { _x: "109" , _y: "405" , _w: "78", _h: "84" },
    20: { _x: "109" , _y: "499" , _w: "78", _h: "79" },
    21: { _x: "21"  , _y: "499" , _w: "78", _h: "79" },
    22: { _x: "21"  , _y: "405" , _w: "78", _h: "84" },
    23: { _x: "21"  , _y: "309" , _w: "78", _h: "86" },
    24: { _x: "21"  , _y: "629" , _w: "78", _h: "86" },
    25: { _x: "21"  , _y: "725" , _w: "78", _h: "84" },
    26: { _x: "21"  , _y: "819" , _w: "78", _h: "79" },
    27: { _x: "109" , _y: "819" , _w: "78", _h: "79" },
    28: { _x: "109" , _y: "725" , _w: "78", _h: "84" },
    29: { _x: "109" , _y: "629" , _w: "78", _h: "86" },
    30: { _x: "197" , _y: "629" , _w: "78", _h: "86" },
    31: { _x: "197" , _y: "725" , _w: "78", _h: "84" },
    32: { _x: "197" , _y: "819" , _w: "78", _h: "79" },
    33: { _x: "285" , _y: "819" , _w: "78", _h: "79" },
    34: { _x: "285" , _y: "725" , _w: "77", _h: "84" },
    35: { _x: "285" , _y: "629" , _w: "78", _h: "86" }
}
// @formatter:on

let currentGameFrame = 0;
let playerHp = 100;

let lastMousePos = {
    x: canvas.width / 2,
    y: canvas.height / 2
};
let enemiesChasing = false;

function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: Math.floor(e.clientX - rect.left),
        y: Math.floor(e.clientY - rect.top)
    };
}

canvas.addEventListener("mousemove", e => {
    let canvasMousePos = getMousePos(canvas, e);
    lastMousePos.x = canvasMousePos.x;
    lastMousePos.y = canvasMousePos.y;
})

canvas.addEventListener("mouseleave", e => {
    enemiesChasing = false;
})
canvas.addEventListener("mouseenter", e => {
    enemiesChasing = true;
})

// document.addEventListener("key", e => {
//     console.log(e);
//     switch(e.key){
//         case "ArrowLeft":
//             lastMousePos.x -= 10;
//             return;
//         case "ArrowRight":
//             lastMousePos.x += 10;
//             return;
//         case "ArrowDown":
//             lastMousePos.y += 10;
//             return;
//         case "ArrowUp":
//             lastMousePos.y -= 10;
//             return;
//     }
// })

class Metroid {
    constructor() {
        this.image = new Image();
        this.image.src = "./images/metroid.png";
        this.spriteWidth = 78;
        this.spriteHeight = 86;
        this.width = this.spriteWidth / 1.5;
        this.height = this.spriteHeight / 1.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.targetX = Math.random() * (canvas.width - this.width);
        this.targetY = Math.random() * (canvas.height - this.height);
        this.animFrameSpeed = Math.floor((Math.random() * 10) + 5);
        this.movementUpdateInterval = Math.floor((Math.random() * 500) + 1);
        this.currentAnimFrame = 1;
        this.animIncreasing = true;
        this.movementSpeed = Math.random() * 10 + 20;
    }

    update() {
        //each movement interval, get new X,Y target coords
        if (currentGameFrame % this.movementUpdateInterval === 0) {
            this.targetX = lastMousePos.x - (this.width * 0.5);
            this.targetY = lastMousePos.y - (this.height * 0.7);
        }

        if (enemiesChasing) {
            // advance towards target
            let distanceX = this.x - this.targetX;
            let distanceY = this.y - this.targetY;
            this.x -= distanceX / this.movementSpeed;
            this.y -= distanceY / this.movementSpeed;
        } else {
            // wiggle in place.
            this.y += Math.random() * 3 - 1.5;
            this.x += Math.random() * 3 - 1.5;
        }


        //check collision
        if (this.x < lastMousePos.x &&
            this.x + this.width > lastMousePos.x &&
            this.y < lastMousePos.y &&
            this.y + this.height > lastMousePos.y
        ) {
            ctx.strokeRect(0, 0, canvas.width, canvas.height)
            playerHp--;
            if (playerHp <= 0) {
                //CHULO
                MetroidEnemies = [];

                setTimeout(() => {

                    location.reload();
                }, 500);
            }
        }


        //animate sprite
        if (currentGameFrame % this.animFrameSpeed === 0) {
            if (this.animIncreasing) {
                this.currentAnimFrame >= 35 ? this.animIncreasing = false : this.currentAnimFrame++;
            } else if (!this.animIncreasing) {
                this.currentAnimFrame <= 0 ? this.animIncreasing = true : this.currentAnimFrame--;
            }
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            AnimFrames[this.currentAnimFrame]._x,
            AnimFrames[this.currentAnimFrame]._y,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width,
            this.height
        )
        ctx.fillRect(lastMousePos.x, lastMousePos.y, 10, 10);
    }
}


let MetroidQuantity = 10;
let MetroidEnemies = [];

for (let i = 0; i < MetroidQuantity; i++) {
    MetroidEnemies.push(new Metroid());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillText("HP: " + playerHp, 25, 25)

    MetroidEnemies.forEach(metroid => {
        metroid.update();
        metroid.draw();
    })

    currentGameFrame++;
    requestAnimationFrame(animate);
}

animate();