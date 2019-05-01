
var settings = {
    // keys

    upKey: 38,
    downKey: 40,
    leftKey: 37,
    rightKey: 39,

    // balls
    twentyFiveBallColor: "Green",
    fifteenBallColor:"Pink", 
    fiveBallColor:  "Blue",

    totalNumOfBalls: 90,
    twentyFiveBallAmount : Math.round(70*0.1),
    fifteenBallAmount : Math.round(70*0.3),
    fiveBallAmount: Math.round(70*0.6),

    // time
    timeLimitation : 80,

    // monsters
    numberOfMonsters : 3
};

function setKeysValue(key, keyVal ,textVal){
    if(key.is(':checked')){
        return keyVal;
    }
    return textVal.val();
}

function loadSettings(){
    $('#timeLimitationRange')[0].value = settings.timeLimitation;
    $('#timeLimitationOutput')[0].value = settings.timeLimitation;
    $('#ballsRangeOutput')[0].value = settings.totalNumOfBalls;
    $('#ballsAmountRange')[0].value = settings.totalNumOfBalls;
}

function checkBallsAmount(maxBallsNumber){
    currentBallsAmount = this.settings.twentyFiveBallAmount + this.settings.fifteenBallAmount + this.settings.fiveBallAmount;
    //less
    if(maxBallsNumber > currentBallsAmount){
        this.settings.fiveBallAmount++;
        if(maxBallsNumber > currentBallsAmount){
            this.settings.fifteenBallAmount++
            if(maxBallsNumber > currentBallsAmount){
                this.settings.twentyFiveBallAmount++
            }
        }
    }
    //more
    if(currentBallsAmount > maxBallsNumber){
        this.settings.fiveBallAmount--;
        if(maxBallsNumber > currentBallsAmount){
            this.settings.fifteenBallAmount--;
            if(maxBallsNumber > currentBallsAmount){
                this.settings.twentyFiveBallAmount--;
            }
        }
    }
}

function setSettings(){
    const ballsRange = $("#ballsRange").val();
    this.settings = {
        //keys 
        upKey: setKeysValue($("#defaultUp"), "up", $("#keysup")),
        downKey: setKeysValue($("#defaultDown"), "down", $("#keysdown")),
        leftKey: setKeysValue($("#defaultLeft"), "left", $("#keysleft")),
        rightKey: setKeysValue($("#defaultRight"), "right", $("#keysright")),
        
        // balls
        twentyFiveBallColor: $("#twentyFiveBallColor").val(),
        fifteenBallColor: $("#fifteenBallColor").val(), 
        fiveBallColor: $("#fiveBallColor")[0].val(),
    
        twentyFiveBallAmount: Math.round(ballsRange * 0.1),
        fifteenBallAmount: Math.round(ballsRange * 0.3),
        fiveBallAmount: Math.round(ballsRange * 0.6),

         // time
        timeLimitation: parseInt($("#timeLimitation")[0].value, 10),

          // monsters
         numberOfMonsters: $("input[name='numOfMonsters']:checked").val()
    }
    checkBallsAmount(ballsRange);
}
function deafaultKeys(){
    $("#defaultUp").prop('checked', true);
    $("#defaultDown").prop('checked', true);
    $("#defaultLeft").prop('checked', true);
    $("#defaultRight").prop('checked', true);

    $('#defaultUp').change();
    $('#defaultDown').change();
    $('#defaultLeft').change();
    $('#defaultRight').change();
}

function randomRange(element, elementOutput){
    let range = parseInt(element[0].max, 10) - parseInt(element[0].min, 10);
    element.val(Math.floor(Math.random() * range) + parseInt(element[0].min, 10) + 1);
    elementOutput.val(element.val());
}

function randomSettings(){
    //keys
    deafaultKeys();
   
    // balls
    $("#twentyFiveBallColor").val(getRandomColor());
    $("#fifteenBallColor").val(getRandomColor());
    $("#fiveBallColor").val(getRandomColor());

     randomRange($("#ballsRange"), $("#ballsRangeOutput"));

     // time
     randomRange($("#timeLimitation"), $("#timeLimitationOutput"));

      // monsters
      var array = document.getElementsByName('numOfMonsters');
      var randomNumber=Math.floor(Math.random() * 3);
   
      array[randomNumber].checked = true; 
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var context = canvas.getContext("2d");
var boardParams = {
    "wall": 4,
    "pacman": 2,
    "monster": 3,
    "fiveBall": 5,
    "fifteenBall": 15,
    "twentyFiveBall": 25,
    "path": 0
};
var shape = new Object();
var board = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,4,4,4,4,0,0,0,4,4,4,4,0,0],
    [0,0,0,0,0,4,0,0,0,4,0,0,0,0,0],
    [0,0,0,4,4,0,0,0,0,4,4,4,0,0,0],
    [0,0,0,0,0,0,0,4,4,4,0,0,0,0,0],
    [0,0,4,0,4,0,0,0,0,4,0,0,4,4,0],
    [0,0,4,0,0,0,0,0,0,4,0,0,0,4,0],
    [0,0,4,0,0,0,4,4,0,0,0,0,0,4,0],
    [0,4,4,0,0,4,4,0,0,0,0,0,0,4,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,4,0],
    [0,0,0,0,0,0,4,4,4,0,0,4,4,4,0],
    [0,0,0,4,4,4,4,0,0,4,0,0,0,0,0],
    [0,0,4,4,0,0,4,4,0,4,0,4,4,0,0],
    [0,0,4,0,0,0,0,0,0,4,4,4,0,0,0],
    [0,0,4,0,0,0,0,0,0,0,0,0,0,0,0],
];
var score;
var pacColor;
var start_time;
var time_elapsed;
var interval;

//Start();

function createPacman(center, diraction){
    switch(diraction){
        case "UP":
            drawPacman(center, 1.40 * Math.PI, 1.75 * Math.PI, center.x + 15, center.y, true);            
            break;
        case "DOWN":
            drawPacman(center, 2.3 * Math.PI, 0.6 * Math.PI, center.x + 15, center.y, true);            
            break;
        case "RIGTH":
            drawPacman(center, 0.15 * Math.PI, 1.85 * Math.PI, center.x, center.y - 15);
            break;
        case "LEFT":
            drawPacman(center, 2.85 * Math.PI, 1.15 * Math.PI, center.x, center.y - 15, true);
            break;     
    }
}

function drawPacman(center, startAngle, endAngle, eyeX, eyeY, counterClockwise = false ){
    context.beginPath();
    context.arc(center.x, center.y, 15, startAngle, endAngle, counterClockwise); // half circle
    context.lineTo(center.x, center.y);
    context.fillStyle = pacColor; //color
    context.fill();
    context.beginPath();
    context.arc(eyeX, eyeY, 2.5, 0.15 * Math.PI , 1.85 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill(); 
}

function createMonsters(center){
    context.beginPath();
    context.fillStyle = "rgb(32, 173, 255)" ;
    context.arc(center.x , center.y, 12.5, Math.PI, 2 * Math.PI);
    context.lineTo(center.x + 12.5, center.y + 12.5);
    context.arc(center.x + 12.5 / 2, center.y + 12.5 , 12.5 * 0.5, 0, Math.PI);
    context.arc(center.x + 12.5  / 2 - 12.5 , center.y + 12.5, 12.5 * 0.5, 0, Math.PI);
    context.closePath();
    context.fill();
    context.strokeStyle = "azure";
    context.stroke();
}

function createWall(center){
    context.beginPath();
    context.rect(center.x - 15, center.y - 15, 40, 40);
    context.fillStyle = "grey"; //color
    context.fill();                      
}

function putPacman(){
    var randomRow;
    var randomCol;
    do {
        randomCol = Math.round(Math.random() * 14);
        randomRow = Math.round(Math.random() * 14);
    }
    while (board[randomRow][randomCol] != boardParams.path);
    
    board[randomRow][randomCol] = boardParams.pacman;
}

function putMonsters(){
    switch(settings.numberOfMonsters){
        case 1:
           board[0][0] = boardParams.monster;
           break;
        case 2:
           board[0][0] = boardParams.monster;
           board[14][14] = boardParams.monster;
           break;
        case 3:
          board[0][0] = boardParams.monster ; 
          board[0][14] = boardParams.monster; 
          board[14][14] = boardParams.monster; 
          break;
    }
}

function createBoard(){
    var fiveBalls = settings.fiveBallAmount;
    var fifteenBalls = settings.fifteenBallAmount;
    var twentyFiveBalls = settings.twentyFiveBallAmount;
    putMonsters();
    putPacman();

    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            if(board[i][j] == boardParams.path) {
                var randomNum = Math.random();
                if( randomNum < 0.33 && fiveBalls > 0 ){
                    board[i][j] = boardParams.fiveBall;
                    shape.i = i;
                    shape.j = j;
                    fiveBalls --; 
                }
                else if( randomNum >= 0.33 && randomNum < 0.66 && fifteenBalls > 0 ){
                    board[i][j] = boardParams.fifteenBall;
                    fifteenBalls --; 
                    shape.i = i;
                    shape.j = j;
                }
                else if( twentyFiveBalls > 0 ) {
                    board[i][j] = boardParams.twentyFiveBall;
                    twentyFiveBalls --; 
                    shape.i = i;
                    shape.j = j;
                }
            }
        }
    }
}

function createBalls(center, ballType) {
    switch(ballType) {
        case 5:
            context.beginPath();
            context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
            context.fillStyle = settings.fiveBallColor;
            context.fill();
            break;
        case 15:
            context.beginPath();
            context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
            context.fillStyle = settings.fifteenBallColor;
            context.fill();
            break;
        case 25:
            context.beginPath();
            context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
            context.fillStyle = settings.twentyFiveBallColor;
            context.fill();
            break;
    }
    
}

function Start() {
   // board = new Array();
    score = 0;
    pacColor = "white";
    // var cnt = 100;
    // var food_remain = 50;
    // var pacman_remain = 1;
    start_time = new Date();
    createBoard();
    // for (var i = 0; i < 10; i++) {
    //     board[i] = new Array();
    //     //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
    //     for (var j = 0; j < 10; j++) {
    //         if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
    //             board[i][j] = 4;
    //         } else {
    //             var randomNum = Math.random();
    //             if (randomNum <= 1.0 * food_remain / cnt) {
    //                 food_remain--;
    //                 board[i][j] = 1;
    //             } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
    //                 shape.i = i;
    //                 shape.j = j;
    //                 pacman_remain--;
    //                 board[i][j] = 2;
    //             } else {
    //                 board[i][j] = 0;
    //             }
    //             cnt--;
    //         }
    //     }
    //     //put monster
    // }
    // while (food_remain > 0) {
    //     var emptyCell = findRandomEmptyCell(board);
    //     board[emptyCell[0]][emptyCell[1]] = 1;
    //     food_remain--;
    // }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 250);
}


// function findRandomEmptyCell(board) {
//     var i = Math.floor((Math.random() * 9) + 1);
//     var j = Math.floor((Math.random() * 9) + 1);
//     while (board[i][j] !== 0) {
//         i = Math.floor((Math.random() * 9) + 1);
//         j = Math.floor((Math.random() * 9) + 1);
//     }
//     return [i, j];
// }

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown['ArrowUp']) {
        return 1;
    }
    if (keysDown['ArrowDown']) {
        return 2;
    }
    if (keysDown['ArrowLeft']) {
        return 3;
    }
    if (keysDown['ArrowRight']) {
        return 4;
    }
}

function Draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            var center = new Object();
            center.x = i * 40 + 15;
            center.y = j * 40 + 15;
            if (board[i][j] === boardParams.pacman) {
                createPacman(center, "RIGTH");
            } else if (board[i][j] === boardParams.monster) {
                createMonsters(center);
            } else if (board[i][j] === boardParams.wall) {
                createWall(center);
            }
            else if(boardParams.path){  }
            else{
                createBalls(center, board[i][j]);
            }
        }
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x === 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
            shape.j--;
        }
    }
    if (x === 2) {
        if (shape.j < 14 && board[shape.i][shape.j + 1] !== 4) {
            shape.j++;
        }
    }
    if (x === 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
            shape.i--;
        }
    }
    if (x === 4) {
        if (shape.i < 14 && board[shape.i + 1][shape.j] !== 4) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] === 1) {
        score++;
    }
    board[shape.i][shape.j] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pacColor = "green";
    }
    if (score === 50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}

function GameSettings(){
    this.moveUp = 'ArrowUp';
    this.moveDown = 'ArrowDown';
    this.moveLeft = 'ArrowLeft';
    this.moveRight = 'ArrowRight';

    this.ballRange = '70';
    this.timeLimitation = '60';
    this.numOfMonsters = '1';

    this.RandomizeSettings = function(){
        this.ballRange = Math.floor((Math.random() * 90) + 50);
        this.timeLimitation = Math.floor((Math.random() * 180) + 60);
        this.numOfMonsters = Math.floor((Math.random() * 3) + 1);
    }

    this.setBallRange = function(rng){
        if (50 <= rng && rng <= 90){
            this.ballRange = rng;
        }
    }

    this.setTimeLimitation = function(limit){
        if(60 <= limit && limit <= 180){
            this.timeLimitation = limit;
        }
        
    }

    this.setNumOfMonsters = function(monsters){
        if (1 <= monsters && monsters <= 3){
            this.numOfMonsters = monster;
        }
        
    }
}