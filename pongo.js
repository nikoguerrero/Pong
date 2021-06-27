

const canvas = document.getElementById('canvas');
const canvContext = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const globalVeloc = 4;

let cpuPaddle = {
    x: 30,
    y: 6,
    width: 15,
    height: 90,
    velocity: 1,
    score: 0
};

let playerPaddle = {
    x: 855,
    y: 6,
    width: 15, 
    height: 90,
    velocity: 0,
    score: 0
};

let ball = {
    x: canvasWidth / 2 - 7.5,
    y: canvasHeight / 2 - 7.5,
    width: 15,
    height: 15,
    velocX: 0,
    velocY: 0
};

let paddleLimit = {
    top: 5,
    bottom: 355
};

function update() {
    cpuPaddle.y += cpuPaddle.velocity * globalVeloc;

    if(cpuPaddle.y > paddleLimit.bottom || cpuPaddle.y < paddleLimit.top) {
        cpuPaddle.velocity *= -1;
    }

    playerPaddle.y += playerPaddle.velocity * globalVeloc;

    if(playerPaddle.y > paddleLimit.bottom) {
        playerPaddle.y = paddleLimit.bottom;
    } else if(playerPaddle.y < paddleLimit.top) {
        playerPaddle.y = paddleLimit.top;
    }

    ball.x += ball.velocX * globalVeloc;
    ball.y += ball.velocY * globalVeloc;

    if(ball.y > canvasHeight - ball.height || ball.y < 0) {
        ball.velocY *= -1;
    } 

    if(playerPaddle.x < ball.x + ball.width && playerPaddle.x + playerPaddle.width > ball.x && playerPaddle.y < ball.y + ball.height && playerPaddle.y + playerPaddle.height > ball.y) {
        ball.velocX *= -1;
        
    }

    if(cpuPaddle.x < ball.x + ball.width && cpuPaddle.x + cpuPaddle.width > ball.x && cpuPaddle.y < ball.y + ball.height && cpuPaddle.y + cpuPaddle.height > ball.y) {
        ball.velocX *= -1;
    }

    if(ball.x > canvasWidth) {
        cpuPaddle.score++;
        console.log(cpuPaddle.score);
        restartBall();
    } else if (ball.x < 0) {
        playerPaddle.score++;
        console.log(playerPaddle.score);
        restartBall();
    }
}

function restartBall() {
    ball.x = canvasWidth / 2 - 7.5;
    ball.y = canvasHeight / 2 - 7.5;
    ball.velocX = Math.max(Math.random(), 0.8);
    if(Math.random() > 0.5) {
        ball.velocX *= -1;
    }
    ball.velocY = Math.max(Math.random(), 0.8);
    if(Math.random() > 0.5) {
        ball.velocY *= -1;
    }
}


function draw(){
    canvContext.clearRect(0, 0, canvasWidth, canvasHeight);
    canvContext.fillRect(cpuPaddle.x, cpuPaddle.y, cpuPaddle.width, cpuPaddle.height);
    canvContext.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    canvContext.fillRect(ball.x, ball.y, ball.width, ball.height);
    canvContext.fillText(cpuPaddle.score, 400, 50);
    canvContext.fillText(playerPaddle.score, 500, 50);
    canvContext.font = '30px Consolas';
    
}

function mainLoop() {
    update();
    draw();
    setTimeout(mainLoop, 16.66); // 16.66 = 60fps
}


window.addEventListener("keydown", (event) => {
   switch(event.key) {
       case 'ArrowDown':
            playerPaddle.velocity = 1;
            break;
       case 'ArrowUp':
            playerPaddle.velocity = -1;
            break;
   }
});

window.addEventListener("keyup", (event) => {
    switch(event.key) {
        case 'ArrowDown':
            playerPaddle.velocity = 0;
            break;
        case 'ArrowUp':
            playerPaddle.velocity = 0;
            break;
    }
});

window.addEventListener("load", () => {
    restartBall();
    mainLoop();
});


