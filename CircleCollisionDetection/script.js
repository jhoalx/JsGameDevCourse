const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.height = 500;
canvas.width = 500;

const lastMousePos = {
    x: 0,
    y: 0,
}
canvas.addEventListener("mousemove", e => {
    lastMousePos.x = e.offsetX;
    lastMousePos.y = e.offsetY;
})

class Circle {
    constructor(x, y, radius, context, followMouse = false) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.followMouse = followMouse;
        this.context = context;
    }

    update() {
        if (this.followMouse) {
            this.x = lastMousePos.x;
            this.y = lastMousePos.y;
        }
    }

    draw() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, 50, 0, 180, false);
        this.context.stroke();
    };
}

const circles = [
    new Circle(canvas.width * 0.5, canvas.height * 0.5, 50, ctx, false),
    new Circle(canvas.width * 0.5, canvas.height * 0.5, 50, ctx, true),
]

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    circles.forEach(circle => {
        circle.update();
        circle.draw();
    })

    ctx.beginPath()
    let distanceX = circles[0].x - circles[1].x;
    let distanceY = circles[0].y - circles[1].y;
    //let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    let distance = Math.hypot(distanceX, distanceY);
    let sumOfRadius = circles[0].radius + circles[1].radius;

    if (distance < sumOfRadius) {
        ctx.strokeStyle = "red";
        ctx.lineWidth = "5"
    } else if (distance === sumOfRadius) {
        ctx.strokeStyle = "blue";
        ctx.lineWidth = "3"
    } else if (distance > sumOfRadius) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = "1"
    }

    ctx.moveTo(circles[0].x, circles[0].y);
    ctx.lineTo(circles[1].x, circles[1].y);
    ctx.stroke();

    requestAnimationFrame(animate);
}

animate();