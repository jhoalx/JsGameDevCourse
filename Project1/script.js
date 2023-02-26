import animationStates from "./animationStates.js";

window.onload = () => {
    let playerState = "idle";
    const dropdown = document.getElementById("animations");

    animationStates.forEach((anim) => {
        dropdown.options.add(new Option(anim.name))
    })

    dropdown.addEventListener("change", (e) => {
        playerState = e.target.value;
    })


    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    const CANVAS_WIDTH = canvas.width = 600;
    const CANVAS_HEIGHT = canvas.height = 600;

    const playerImage = new Image();
    playerImage.src = "images/shadow_dog.png";

    const spriteWidth = 575;
    const spriteHeight = 523;

    let gameFrame = 0;
    let staggerFrames = 7;

    const spriteAnimations = [];


    animationStates.forEach((state, index) => {
        let frames = {
            loc: [],
        }

        for (let j = 0; j < state.frames; j++) {
            let positionX = j * spriteWidth;
            let positionY = index * spriteHeight;

            frames.loc.push({x: positionX, y: positionY})
        }
        spriteAnimations[state.name] = frames;
    })
    console.log(spriteAnimations);

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;

        let frameX = spriteWidth * position;
        let frameY = spriteAnimations[playerState].loc[position].y;

        ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight,);

        // if(gameFrame % staggerFrames === 0){
        //     if(frameX < 10) frameX++; else frameX = 0;
        // }

        gameFrame++;
        requestAnimationFrame(animate);
    }

    animate();
}

