console.log('hello world');

const canvas = document.getElementById('canvas');
const canvContext = canvas.getContext('2d');
let y = 6;
let y2 = 6;
let v = 1;
let v2 = 0;

function draw(){
    canvContext.clearRect(0, 0, 300, 150);
    canvContext.fillRect(30, y, 5, 30);
    canvContext.fillRect(265, y2, 5, 30);
    canvContext.fillRect(147.5, 72.5, 5, 5);
    setTimeout(draw, 16.66);
    y+= v;

    if(y === 115 || y === 5) {
        v*=-1;
    }

    if(y2 === 115 || y2 === 5) {
        v2 = 0;
    }
    y2+= v2;
}
draw();

window.addEventListener("keydown", (event) => {
   switch(event.key) {
       case 'ArrowDown':
           v2= 1;
           console.log('arrowDown');
           break;
       case 'ArrowUp':
           v2= -1;
           console.log('arrowUp');
           break;
   }
});

window.addEventListener("keyup", (event) => {
    switch(event.key) {
        case 'ArrowDown':
            v2= 0;
            break;
        case 'ArrowUp':
            v2= 0;
            break;
    }
});



