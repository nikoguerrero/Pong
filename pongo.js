import { startTimer, stopTimer } from "./Timer.js";

const canvas = document.getElementById('canvas');
const canvContext = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const globalVeloc = 4;


let cpuPaddle = {
    x: 30,
    y: canvasHeight / 2 - 45,
    width: 15,
    height: 90,
    velocity: 1,
    score: 0
};

let playerPaddle = {
    x: 855,
    y: canvasHeight / 2 - 45,
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

let smartness = 1;
let smartPercentage = 0.5;

function init() {
    startTimer(tick, timeUp);
    restartBall();
    mainLoop();
}

function tick() {
    console.log('tick');
}

function timeUp() {
    console.log('time\'s up');
}

function update() {

    if(ball.x + ball.width / 2 < canvasWidth / 3 && ball.velocX < 0) {
        if(smartness > smartPercentage) {
            if(ball.y + ball.height / 2 > cpuPaddle.y + cpuPaddle.height / 2 + cpuPaddle.height / 10) {
                cpuPaddle.y += cpuPaddle.velocity * globalVeloc * 0.8;
            } else if (ball.y + ball.height / 2 < cpuPaddle.y + cpuPaddle.height / 2 - cpuPaddle.height / 10) {
                cpuPaddle.y -= cpuPaddle.velocity * globalVeloc * 0.8;
            }
        } else {
            // cpuPaddle.y -= cpuPaddle.velocity * globalVeloc;
        }
    } 

    playerPaddle.y += playerPaddle.velocity * globalVeloc;

    if(playerPaddle.y > paddleLimit.bottom) {
        playerPaddle.y = paddleLimit.bottom;
    } else if(playerPaddle.y < paddleLimit.top) {
        playerPaddle.y = paddleLimit.top;
    }

    ball.x += ball.velocX * globalVeloc;
    ball.y += ball.velocY * globalVeloc;

    if(ball.x < 0) {
        cpuPaddle.y += cpuPaddle.velocity * globalVeloc;
    }

    if(ball.y > canvasHeight - ball.height || ball.y < 0) {
        ball.velocY *= -1;
    } 

    if(playerPaddle.x < ball.x + ball.width && playerPaddle.x + playerPaddle.width > ball.x && playerPaddle.y < ball.y + ball.height && playerPaddle.y + playerPaddle.height > ball.y) {
        if (Math.abs(ball.x + ball.width - playerPaddle.x) <= Math.abs(ball.velocX * globalVeloc)) {
            ball.velocX *= -1;
        } else {
            if (ball.y > playerPaddle.y) {
                ball.y += globalVeloc;
                ball.velocY = globalVeloc * 0.2;
            } else {
                ball.y -= globalVeloc;
                ball.velocY = -globalVeloc * 0.2;
            }
        }
    }

    if(cpuPaddle.x < ball.x + ball.width && cpuPaddle.x + cpuPaddle.width > ball.x && cpuPaddle.y < ball.y + ball.height && cpuPaddle.y + cpuPaddle.height > ball.y) {
        if (Math.abs(cpuPaddle.x + cpuPaddle.width - ball.x) <= Math.abs(ball.velocX * globalVeloc)) {
            ball.velocX *= -1;
        } else {
            if (ball.y > cpuPaddle.y) {
                ball.y += globalVeloc;
                ball.velocY = globalVeloc * 0.2;
            } else {
                ball.y -= globalVeloc;
                ball.velocY = -globalVeloc * 0.2;
            }
        }
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
    ball.velocX = Math.max(Math.random(), 1);
    if(Math.random() > 0.5) {
        ball.velocX *= -1;
    }
    ball.velocY = Math.max(Math.random(), 1);
    if(Math.random() > 0.5) {
        ball.velocY *= -1;
    }
}

function draw(){
    canvContext.fillStyle = 'black';
    canvContext.fillRect(0, 0, canvasWidth, canvasHeight);
    canvContext.fillStyle = 'orange';
    canvContext.fillRect(cpuPaddle.x, cpuPaddle.y, cpuPaddle.width, cpuPaddle.height);
    canvContext.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height);
    canvContext.fillStyle = 'white';
    canvContext.fillRect(ball.x, ball.y, ball.width, ball.height);
    canvContext.fillStyle = 'purple';
    canvContext.font = '48px game font';
    canvContext.textAlign = 'center';
    canvContext.fillText(cpuPaddle.score, canvasWidth / 4, 80);
    canvContext.fillText(playerPaddle.score, canvasWidth / 4 + canvasWidth / 2, 80);
    canvContext.lineWidth = 5;
    canvContext.strokeStyle = 'white';
    canvContext.beginPath();
    canvContext.setLineDash([20, 20]);
    canvContext.moveTo(canvasWidth / 2, 0);
    canvContext.lineTo(canvasWidth / 2, canvasHeight);
    canvContext.stroke();
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
    init();
});




