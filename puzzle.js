function start()
{
   document.querySelector(".startgame").style.visibility="hidden";
   document.querySelector(".board").style.visibility="visible";
   document.querySelector(".turns").style.visibility="visible";
   document.querySelector(".fa-regular").style.visibility="visible";
   Easy();
    
}


var easyarray = ["1","2","3","4","5","6","7","8","9"];
var mediumarray = ["16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
var hardarray = ["25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];



var rows;
var columns;
var blank;
var imgOrder;
var difficulty ;
var originalarray;
var current;
var bool = true;
var turns = 0;

function Easy()
{
    turns = 0;
    document.querySelector(".startgame").style.visibility="hidden";
    document.querySelector(".turns").style.visibility="visible";
    document.querySelector(".board").style.visibility="visible";
    document.querySelector(".popup").style.visibility="hidden"; 
    current = "Easy";
    rows=3;
    columns=3;
    if(bool){
        // imgOrder = ["2","1","4","5","3","6","7","9","8"];
        imgOrder = ["1","3","2","4","5","6","7","8","9"];
        document.querySelector(".fa-solid").style.visibility="hidden";
        document.querySelector(".fa-regular").style.visibility="visible";
    }
    else{
        imgOrder = ["1","2","3","4","5","6","7","8","9"];
    }
    bool = true;
    blank = "3Easy.jpg";
    difficulty = "Easy";
    originalarray = easyarray;
    document.getElementById("turns").innerHTML = 0;
    document.getElementById("won").innerHTML = 0;
    document.getElementById("easy").style.textDecoration = "underline" ;
    document.getElementById("medium").style.textDecoration = "none" ;
    document.getElementById("hard").style.textDecoration = "none" ;
    showPuzzle("Easy");
}

function Medium()
{
    turns = 0;
    document.querySelector(".startgame").style.visibility="hidden";
    document.querySelector(".turns").style.visibility="visible";
    document.querySelector(".board").style.visibility="visible";
    document.querySelector(".popup").style.visibility="hidden"; 
    current = "Medium";
    rows=4;
    columns=4;
    if(bool)
    {
        imgOrder = ["16","2","13","14","4","11","1","8","9","7","6","5","12","3","15","10"];
        document.querySelector(".fa-solid").style.visibility="hidden";
        document.querySelector(".fa-regular").style.visibility="visible";
    }
    else{
       imgOrder = ["16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
    }
    bool = true;
    blank = "13Medium.jpg";
    difficulty = "Medium";
    originalarray = mediumarray;
    document.getElementById("turns").innerHTML = 0;
    document.getElementById("won").innerHTML = 0;
    document.getElementById("easy").style.textDecoration = "none" ;
    document.getElementById("medium").style.textDecoration = "underline" ;
    document.getElementById("hard").style.textDecoration = "none" ;
    showPuzzle("Medium");
    
}
function Hard()
{
    turns = 0;
    document.querySelector(".startgame").style.visibility="hidden";
    document.querySelector(".turns").style.visibility="visible";
    document.querySelector(".board").style.visibility="visible";
    document.querySelector(".popup").style.visibility="hidden"; 
    current = "Hard";
    rows=5;
    columns=5;
    if(bool)
    {
        imgOrder = ["25","24","6","21","22","20","9","1","17","16","5","4","13","12","11","10","19","8","7","23","15","14","3","2","18"];
        document.querySelector(".fa-solid").style.visibility="hidden";
        document.querySelector(".fa-regular").style.visibility="visible";
    }
    else{
    imgOrder = ["25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1"];
    }
    bool = true;
    
    blank = "21Hard.jpg";
    difficulty = "Hard";
    originalarray = hardarray;
    document.getElementById("turns").innerHTML = 0;
    document.getElementById("won").innerHTML = 0;
    document.getElementById("easy").style.textDecoration = "none" ;
    document.getElementById("medium").style.textDecoration = "none" ;
    document.getElementById("hard").style.textDecoration = "underline" ;
    showPuzzle("Hard");
}
var currTile;
var otherTile; 
 



// var imgOrder ;

function showPuzzle(difficulty){
    // console.log(rows);
    var board=document.getElementById("board")
    // while(board.hasChildNodes())
    //     board.removeChild(board.firstChild);
    board.innerHTML = "";
    
    var imageNumber=0
    for(let r=0; r<rows; r++)
    {
        for(let c=0; c<columns; c++)
        {

            let tile = document.createElement("img");
            tile.id = r.toString()+"-"+c.toString();
            tile.src = imgOrder[imageNumber++]+difficulty+".jpg";
            tile.style.width=((360/rows)-2)+"px";
            tile.style.height=((360/columns)-2)+"px";
            tile.addEventListener("dragstart",dragStart);
            tile.addEventListener("dragover",dragOver);
            tile.addEventListener("dragenter",dragEnter);
            tile.addEventListener("dragleave",dragLeave);
            tile.addEventListener("drop",dragDrop);
            tile.addEventListener("dragend",dragEnd);
            document.getElementById("board").append(tile);
        }
    }
}
// showPuzzle();

var currTileIndex ;
var otherTileIndex ;





function dragStart(){
    currTile = this;
    var slash = currTile.src.split("/");
    currTileIndex = parseInt(slash.pop());
    console.log(currTileIndex);
}


function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(e){
    e.preventDefault();
}

function dragDrop(){
    
    otherTile = this;
    var slash = otherTile.src.split("/");
    otherTileIndex = parseInt(slash.pop());
    console.log(otherTileIndex);
}

function dragEnd(){
    
    if(!otherTile.src.includes(blank)){
        return;
    }


    let currCoords = currTile.id.split("-");
    let r1 = parseInt(currCoords[0]);
    let c1 = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveleft = r1 == r2 && c1 == c2-1;
    let moveright = r1 == r2 && c1 == c2+1;

    let moveup = r1 == r2-1 && c1 == c2;
    let movedown = r1 == r2+1 && c1 == c2;

    let isAdjacent = moveleft || moveright || moveup || movedown;


    if(isAdjacent){

    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerHTML = turns;
    document.getElementById("won").innerHTML = turns;
    
    var index1 = imgOrder.indexOf(otherTileIndex+"");
    var index2 = imgOrder.indexOf(currTileIndex+"");

    imgOrder[index1] = currTileIndex+"";
    imgOrder[index2] = otherTileIndex+"";

    // console.log(imgOrder);

    if(imgOrder.join()==originalarray.join())
    {
        const doc = document.querySelector(".fa-regular").style.visibility;
        if(doc==="visible")
        {
            document.querySelector(".board").style.visibility="hidden";  
            document.querySelector(".popup").style.visibility="visible";
        }
        
    }

    }
    
}


function replay(){
    if(current == "Easy")
    {
        Easy();
    }
    else if(current == "Medium")
    {
        Medium();
    }
    else{
        Hard();
    }
}

function next(){
    turns = 0;
    document.getElementById("won").innerHTML = 0;
    if(current == "Easy")
    {
        Medium();
    }
    else if(current == "Medium")
    {
        Hard();
    }
    else{
        Easy();
    }
}


function solvePuzzle(){
    document.querySelector(".fa-solid").style.visibility="visible";
    document.querySelector(".fa-regular").style.visibility="hidden";
    bool = false;

    if(current == "Easy")
    {
        Easy();
    }
    else if(current == "Medium")
    {
        Medium();
    }
    else{
        Hard();
    }
}


