const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let lastMousePos = {
    x: 0,
    y: 0,
}

canvas.addEventListener("mousemove", e => {
    lastMousePos.x = e.offsetX;
    lastMousePos.y = e.offsetY;
})

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    update(newX, newY) {
        this.x = newX - this.width * 0.5;
        this.y = newY - this.height * 0.5;
    }
}


const staticRect = new Rectangle(canvas.width * 0.5 - 50, canvas.height * 0.5 - 50, 100, 100);
const dynamicRect = new Rectangle(lastMousePos.x, lastMousePos.y, 75, 75);


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (
        dynamicRect.x < staticRect.x + staticRect.width &&
        dynamicRect.x + dynamicRect.width > staticRect.x &&
        dynamicRect.y < staticRect.y + staticRect.height &&
        dynamicRect.y + dynamicRect.height > staticRect.y
    ){
        ctx.strokeStyle = "red";
        ctx.lineWidth = "5"
    } else
    {
        ctx.strokeStyle =  "black";
        ctx.lineWidth = "1"
    }

    staticRect.draw(ctx);
    dynamicRect.draw(ctx);
    dynamicRect.update(lastMousePos.x, lastMousePos.y);

    requestAnimationFrame(animate);
}

animate();