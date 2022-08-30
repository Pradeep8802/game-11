var can=document.querySelector('canvas');
can.width=window.innerWidth;
can.height=window.innerHeight;
var c=can.getContext('2d');

// GAME STARTING CREDENTIALS
const XSTARTINGOFGAME = 100;
const YSTARTINGOFGAME = 100;

// BOARD CONTRAINTS
const NOOFROWS=10;
const NOOFCOLUMNS=10;
const WIDTHOFEACHBLOCK=20;
const HEIGTHOFEACHBLOCK=20;

function drawRows(){
    for(let i=0;i<NOOFCOLUMNS+1;i++){
        c.beginPath();
        c.moveTo(XSTARTINGOFGAME,YSTARTINGOFGAME+i*HEIGTHOFEACHBLOCK);
        c.lineTo(XSTARTINGOFGAME+WIDTHOFEACHBLOCK*NOOFROWS,YSTARTINGOFGAME+i*HEIGTHOFEACHBLOCK);
        c.strokeStyle='black';
        c.stroke();}
}

function drawColumns(){
    for(let i=0;i<NOOFROWS+1;i++){
        c.beginPath();
        c.moveTo(XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK,YSTARTINGOFGAME);
        c.lineTo(XSTARTINGOFGAME+i*WIDTHOFEACHBLOCK,YSTARTINGOFGAME+HEIGTHOFEACHBLOCK*NOOFCOLUMNS);
        c.strokeStyle='black';
        c.stroke();}
}


function drawBackGround(){
    drawRows();
    drawColumns();
} 


var currentPosition=[[XSTARTINGOFGAME+WIDTHOFEACHBLOCK/2,YSTARTINGOFGAME+3*HEIGTHOFEACHBLOCK/2],[XSTARTINGOFGAME+WIDTHOFEACHBLOCK/2,YSTARTINGOFGAME+HEIGTHOFEACHBLOCK/2],[XSTARTINGOFGAME+WIDTHOFEACHBLOCK/2,YSTARTINGOFGAME+3*HEIGTHOFEACHBLOCK/2]];

var target=[[undefined,undefined]];
for(let i=0;i<currentPosition.length;i++){
    target.push([currentPosition[i][0],currentPosition[i][1]]);
}
// var target=[[undefined,undefined],[XSTARTINGOFGAME+WIDTHOFEACHBLOCK/2,YSTARTINGOFGAME+HEIGTHOFEACHBLOCK/2]];



// function drawHead(){
//     c.fillStyle='red';
//     c.fillRect(currentPosition[0][0]-WIDTHOFEACHBLOCK/2,currentPosition[0][1]-HEIGTHOFEACHBLOCK/2,WIDTHOFEACHBLOCK,HEIGTHOFEACHBLOCK);
    
// }

function drawSnake(){
    c.fillStyle='#FFCCCB';
    c.fillRect(currentPosition[0][0]-WIDTHOFEACHBLOCK/2,currentPosition[0][1]-HEIGTHOFEACHBLOCK/2,WIDTHOFEACHBLOCK,HEIGTHOFEACHBLOCK);
    
    for(let i=1;i<currentPosition.length;i++){
        c.fillStyle='red';
        c.fillRect(currentPosition[i][0]-WIDTHOFEACHBLOCK/2,currentPosition[i][1]-HEIGTHOFEACHBLOCK/2,WIDTHOFEACHBLOCK,HEIGTHOFEACHBLOCK);
    }
}

function draw(){
    drawBackGround();
    //drawHead();
    drawSnake();

}

var rightKey=false;
var leftKey=false;
var upKey=false;
var downKey=false;

window.addEventListener("keydown", (event) => {
    if (event.key== 'd') {
        rightKey=true;
    } 
    else if (event.key== 's') {
        downKey=true;
    }    
    else if (event.key== 'w') {
        upKey=true;
    }
    else if (event.key== 'a') {
        leftKey=true;
    }
  }, true);


function updateHead(){
    if(leftKey==true){
        target[0][0]=currentPosition[0][0]-WIDTHOFEACHBLOCK;
        currentPosition[0][0]=currentPosition[0][0]-WIDTHOFEACHBLOCK;
        leftKey=false;
    }
    else if(rightKey==true){
//        target[0][1]=currentPosition[0][0]+WIDTHOFEACHBLOCK;
        currentPosition[0][0]=currentPosition[0][0]+WIDTHOFEACHBLOCK;
        rightKey=false;
        console.log("hello");
    }
    else if(upKey==true){
        // target[0][1]=currentPosition[0][1]-HEIGTHOFEACHBLOCK;
        currentPosition[0][1]=currentPosition[0][1]-HEIGTHOFEACHBLOCK;
        upKey=false;
    }
    else if(downKey==true){
        //target[0][1]=currentPosition[0][1]+HEIGTHOFEACHBLOCK;
        currentPosition[0][1]=currentPosition[0][1]+HEIGTHOFEACHBLOCK;
        downKey=false;
    }
}


function updateSnakeToTarget(){
    if(target[0][0]!=undefined && target[0][1]!=undefined){
        for(let i=0;i<currentPosition.length;i++){
            currentPosition[i][0]=target[i][0];
            currentPosition[i][1]=target[i][1];
        }
        target[0][0]=undefined;
        target[0][1]=undefined;
    }
    else{
        if(currentPosition[0][0]==currentPosition[1][0] && currentPosition[1][1]> currentPosition[0][1]){
            currentPosition[0][1]=currentPosition[0][1]-HEIGTHOFEACHBLOCK;
            
        }
        else if(currentPosition[0][0]==currentPosition[1][0] && currentPosition[1][1]< currentPosition[0][1]){
            currentPosition[0][1]=currentPosition[0][1]+HEIGTHOFEACHBLOCK;
        }
        else if(currentPosition[0][1]==currentPosition[1][1] && currentPosition[1][0]> currentPosition[0][0]){
            currentPosition[0][0]=currentPosition[0][0]-WIDTHOFEACHBLOCK;
            
        }
        else if(currentPosition[0][1]==currentPosition[1][1] && currentPosition[1][0]< currentPosition[0][0]){
            currentPosition[0][0]=currentPosition[0][0]+WIDTHOFEACHBLOCK;
            
        }
        for(let i=1;i<currentPosition.length;i++){
            currentPosition[i][0]=target[i][0];
            currentPosition[i][1]=target[i][1];
        }
    }
}

function updateTargets(){
    for(let i=1;i<currentPosition.length;i++){
        target[i][0]=currentPosition[i-1][0];
        target[i][1]=currentPosition[i-1][1];
    }
}

function update(){
    console.log(currentPosition);
    console.log(target);
    c.clearRect(0,0,can.width,can.height);
    updateHead();
    updateSnakeToTarget();
    updateTargets();
}

const TIME_FROM_GAME_START = new Date().getTime();

function main(){
    update();
    draw();
}
setInterval(main,500);



