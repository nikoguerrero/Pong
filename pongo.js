console.log('hello world');

const canvas = document.getElementById('canvas');
const canvContext = canvas.getContext('2d');
let compY = 6;
let compVelocity = 1;
let playerY = 6;
let playerVelocity = 0;


function draw(){
    canvContext.clearRect(0, 0, 300, 150);
    canvContext.fillRect(30, compY, 5, 30);
    canvContext.fillRect(265, playerY, 5, 30);
    canvContext.fillRect(147.5, 72.5, 5, 5);
    setTimeout(draw, 16.66);
    compY+= compVelocity;

    if(compY === 115 || compY === 5) {
        compVelocity *= -1;
    }

    playerY += playerVelocity;

    if(playerY > 114) {
        playerY = 114;
    } else if(playerY < 6) {
        playerY = 6;
    }
}
draw();

window.addEventListener("keydown", (event) => {
   switch(event.key) {
       case 'ArrowDown':
           playerVelocity = 1;
           break;
       case 'ArrowUp':
           playerVelocity = -1;
           break;
   }
});

window.addEventListener("keyup", (event) => {
    switch(event.key) {
        case 'ArrowDown':
            playerVelocity = 0;
            break;
        case 'ArrowUp':
            playerVelocity = 0;
            break;
    }
});



