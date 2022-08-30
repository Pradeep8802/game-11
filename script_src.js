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
        c.fillStyle='yellow';
        c.fillRect(currentPosition[i][0]-WIDTHOFEACHBLOCK/2,currentPosition[i][1]-HEIGTHOFEACHBLOCK/2,WIDTHOFEACHBLOCK,HEIGTHOFEACHBLOCK);
    }
}

function draw(){
    drawBackGround();
    drawFood();
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



    // console.log(currentPosition);
    // console.log(target);
    
    
    
    c.clearRect(0,0,can.width,can.height);
    
   
    createFood();
    eatFood();
    updateHead();
    updateSnakeToTarget();
    updateTargets();
    changeLengthOfSnake();
}

const TIME_FROM_GAME_START = new Date().getTime();

function main(){
    update();
    draw();

}
setInterval(main,500);



var COLORSOFFOOD=['green','black','blue'];
const NOOFCOLORS=COLORSOFFOOD.length;
const WIDTHOFFOOD=WIDTHOFEACHBLOCK/2;
const HEIGTHOFFOOD=HEIGTHOFEACHBLOCK/2;

var snakePositions=[];

for(let i=0;i<currentPosition.length;i++){
    var a=(currentPosition[i][0]-WIDTHOFEACHBLOCK/2-XSTARTINGOFGAME)/WIDTHOFEACHBLOCK;
    var b=(currentPosition[i][1]-HEIGTHOFEACHBLOCK/2-YSTARTINGOFGAME)/HEIGTHOFEACHBLOCK;
    snakePositions.push([a,b]);
}


function notInSameBlock(a,b){
    for(let i=0;i<currentPosition.length;i++){
        if(a==currentPosition[i][0] || b==currentPosition[i][1]){
            continue;
        }
        else{
            return true;
        }

    }
    return false;
}


function findEmptyBlock(){
    var got=false;
    var row;var column;
    while(got==false){
        let a=XSTARTINGOFGAME+ (Math.floor(Math.random()*NOOFROWS))*    WIDTHOFEACHBLOCK+WIDTHOFEACHBLOCK/2;    
        let b=YSTARTINGOFGAME +(Math.floor(Math.random()*NOOFCOLUMNS))  *HEIGTHOFEACHBLOCK+HEIGTHOFEACHBLOCK/2;
        if(notInSameBlock(a,b)==true){
            if(overlappingWithFood(a,b)==false){
                got=true;
                row=a;
                column=b;
            }
        }
    }
    return [row,column];
}

var foodEaten=false;

function changeLengthOfSnake(){
    if(foodEaten==true ){
        target.push([currentPosition[currentPosition.length-1][0],currentPosition[currentPosition.length-1][1]]);
        if(currentPosition[currentPosition.length-1][0]==currentPosition[currentPosition.length-2][0] && currentPosition[currentPosition.length-1][1]>currentPosition[currentPosition.length-2][1]){
            currentPosition.push([currentPosition[currentPosition.length-1][0],currentPosition[currentPosition.length-1][1]+HEIGTHOFEACHBLOCK]);
        }
        else if(currentPosition[currentPosition.length-1][0]==currentPosition[currentPosition.length-2][0] && currentPosition[currentPosition.length-1][1]<currentPosition[currentPosition.length-2][1]){
            currentPosition.push([currentPosition[currentPosition.length-1][0],currentPosition[currentPosition.length-1][1]-HEIGTHOFEACHBLOCK]);
        } 
        else if(currentPosition[currentPosition.length-1][1]==currentPosition[currentPosition.length-2][1] && currentPosition[currentPosition.length-1][0]>currentPosition[currentPosition.length-2][0]){
            currentPosition.push([currentPosition[currentPosition.length-1][0]+WIDTHOFEACHBLOCK,currentPosition[currentPosition.length-1][1]]);
        }
        else if(currentPosition[currentPosition.length-1][1]==currentPosition[currentPosition.length-2][1] && currentPosition[currentPosition.length-1][0]<currentPosition[currentPosition.length-2][0]){
            currentPosition.push([currentPosition[currentPosition.length-1][0]-WIDTHOFEACHBLOCK,currentPosition[currentPosition.length-1][1]]);
        }
        foodEaten=false; 
    }
}

const XOFFIRSTFOODLOCATION=XSTARTINGOFGAME+Math.floor(NOOFROWS/2)*WIDTHOFEACHBLOCK+WIDTHOFEACHBLOCK/2;
const YOFFIRSTFOODLOCATION=YSTARTINGOFGAME+Math.floor(NOOFCOLUMNS/2)*HEIGTHOFEACHBLOCK+HEIGTHOFEACHBLOCK/2;
//var foodArray=[[undefined,undefined,undefined]];
var foodArray=[[XOFFIRSTFOODLOCATION,YOFFIRSTFOODLOCATION,1]];
function createFood(){
   if(foodEaten==true){
        let row,column;
        [row,column]=findEmptyBlock();
        let color=Math.floor(Math.random()*NOOFCOLORS);
        foodArray.push([row,column,COLORSOFFOOD[color]]);
        foodEaten=false;
    }
} 

function drawFood(){
    for(let i=0;i<foodArray.length;i++){
        c.fillStyle=foodArray[i][2];
        c.fillRect(foodArray[i][0]-WIDTHOFEACHBLOCK/2,foodArray[i][1]-HEIGTHOFEACHBLOCK/2,WIDTHOFEACHBLOCK,HEIGTHOFEACHBLOCK);
    }
}

function overlappingWithFood(a,b){
    for(let i=0;i<foodArray.length;i++){
        if(foodArray[i][0]==a && foodArray[i][1]==b){
            return true;
        }
    }
    return false;
}

function deleteThatFood(i){
    foodEaten=true;
    foodArray.splice(i,1);
}


function eatFood(){
    for(let i=0;i<foodArray.length;i++){
        if(foodArray[i][0]==currentPosition[0][0] && foodArray[i][1]==currentPosition[0][1]){
            deleteThatFood(i);
        }

    }




}