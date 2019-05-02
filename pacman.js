
var settings = {
    // keys

    upKey: 'ArrowUp',
    downKey: 'ArrowDown',
    leftKey: 'ArrowLeft',
    rightKey: 'ArrowRight',

    // balls
    twentyFiveBallColor: "Green",
    fifteenBallColor:"Pink", 
    fiveBallColor:  "Blue",

    totalNumOfBalls: 90,
    twentyFiveBallAmount : Math.round(70*0.1),
    fifteenBallAmount : Math.round(70*0.3),
    fiveBallAmount: Math.round(70*0.6),

    // time
    timeLimitation : 15,

    // monsters
    numberOfMonsters : 3
};

var playTimeTwentyFiveBallAmount = settings.twentyFiveBallAmount;
var playTimeFifteenBallAmount = settings.fifteenBallAmount;
var playTimeFiveBallAmount = settings.fiveBallAmount;
var playTimeTimeLimitation = settings.timeLimitation;

function setKeysValue(key, keyVal ,textVal){
    if(key.is(':checked')){
        return keyVal;
    }
    return textVal.val();
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
        upKey: setKeysValue($("#defaultUp"), "ArrowUp", $("#keysup")),
        downKey: setKeysValue($("#defaultDown"), "ArrowDown", $("#keysdown")),
        leftKey: setKeysValue($("#defaultLeft"), "ArrowLeft", $("#keysleft")),
        rightKey: setKeysValue($("#defaultRight"), "ArrowRight", $("#keysright")),
        
        // balls
        twentyFiveBallColor: $("#twentyFiveBallColor").val(),
        fifteenBallColor: $("#fifteenBallColor").val(), 
        fiveBallColor: $("#fiveBallColor").val(),
    
        twentyFiveBallAmount: Math.round(ballsRange * 0.1),
        fifteenBallAmount: Math.round(ballsRange * 0.3),
        fiveBallAmount: Math.round(ballsRange * 0.6),

         // time
        timeLimitation: parseInt($("#timeLimitationRange").val()),

          // monsters
         numberOfMonsters: parseInt($("input[name='numOfMonsters']:checked").val())
    }
    var nu = $("input[name='numOfMonsters']:checked").val();
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
var ballsBoard = [
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
var score = 0;
var lives = 3;
var pacColor;
var start_time;
var time_remaining;
var interval;
var monstersPos;
var pacmanPos;
var lost = false;
var pacmanLastDiraction = 4;
var originalStyle;
var styleChanged = false;

//Start();

function createPacman(center, diraction){
    if(diraction == undefined){
        diraction = pacmanLastDiraction;
    }
    switch(diraction){
        case 1:
            drawPacman(center, 1.40 * Math.PI, 1.75 * Math.PI, center.x , center.y + 7, true);            
            break;
        case 2:
            drawPacman(center, 2.3 * Math.PI, 0.6 * Math.PI, center.x , center.y + 7, true);            
            break;
        case 4:
            drawPacman(center, 0.15 * Math.PI, 1.85 * Math.PI, center.x + 7, center.y );
            break;
        case 3:
            drawPacman(center, 2.85 * Math.PI, 1.15 * Math.PI, center.x + 7, center.y , true);
            break;  
    }
}

function drawPacman(center, startAngle, endAngle, eyeX, eyeY, counterClockwise = false ){
    context.beginPath();
    context.arc(center.x + 7, center.y + 7, 15, startAngle, endAngle, counterClockwise); // half circle
    context.lineTo(center.x + 7, center.y + 7);
    context.fillStyle = pacColor; //color
    context.fill();
    context.beginPath();
    context.arc(eyeX, eyeY, 3, 0.15 * Math.PI , 1.85 * Math.PI); // circle
    context.fillStyle = "black"; //color
    context.fill(); 
}

function createBalls(center, ballType) {
    switch(ballType) {
        case 5:
            drawBall(center, settings.fiveBallColor);
            break;
        case 15:
            drawBall(center, settings.fifteenBallColor);
            break;
        case 25:
            drawBall(center, settings.twentyFiveBallColor);
            break;
    }
    
}

function drawBall(center, color){
    context.beginPath();
    context.arc(center.x + 7, center.y + 7, 12.5, 0, 2 * Math.PI); // circle
    context.fillStyle = color;
    context.fill();
}

function createMonsters(center){
    context.beginPath();
    context.fillStyle = "rgb(32, 173, 255)" ;
    context.arc(center.x + 7.5 , center.y + 7.5, 12.5, Math.PI, 2* Math.PI);
    context.lineTo(center.x + 7.5 + 12.5, center.y + 7.5 + 7.5);
    context.arc(center.x + 7.5 + 12.5 / 2, center.y + 7.5 + 7.5, 12.5 * 0.5, 0, Math.PI);
    context.arc(center.x + 7.5 + 12.5 / 2 -12.5 , center.y + 7.5 + 7.5, 12.5 * 0.5, 0, Math.PI);
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
    var randomRow = Math.round(Math.random() * 14);
    var randomCol = Math.round(Math.random() * 14);
    while (board[randomRow][randomCol] != boardParams.path){
        randomRow = Math.round(Math.random() * 14);
        randomCol = Math.round(Math.random() * 14);
    };
    
    board[randomRow][randomCol] = boardParams.pacman;
    pacmanPos = {row: randomRow, col: randomCol};
}

function putMonsters(){
    switch(settings.numberOfMonsters){
        case 1:
           board[0][0] = boardParams.monster;
           monstersPos = [{row: 0, col:0}];
           break;
        case 2:
           board[0][0] = boardParams.monster;
           board[14][14] = boardParams.monster;
           monstersPos = [{row: 0, col:0},{row: 14, col :14}];
           break;
        case 3:
          board[0][0] = boardParams.monster ; 
          board[0][14] = boardParams.monster; 
          board[14][14] = boardParams.monster; 
          monstersPos = [{row: 0, col:0},{row: 14, col :14},{row: 0, col: 14}];
          break;
    }
}

function createBoard(){
    var fiveBalls = playTimeFiveBallAmount;
    var fifteenBalls = playTimeFifteenBallAmount;
    var twentyFiveBalls = playTimeTwentyFiveBallAmount;
    putMonsters();
    putPacman();

    for (var i = 0; i < 15*15; i++) {
        var randomIs = initiateRandomArray();
        var randomJs = initiateRandomArray();
        if(board[randomIs[i]][randomJs[i]] == boardParams.path) {
            var randomNum = Math.random();
            if( randomNum < 0.33 && fiveBalls > 0 ){
                board[randomIs[i]][randomJs[i]] = boardParams.fiveBall;
                ballsBoard[randomIs[i]][randomJs[i]] = boardParams.fiveBall;
                fiveBalls --; 
            }
            else if( randomNum >= 0.33 && randomNum < 0.66 && fifteenBalls > 0 ){
                board[randomIs[i]][randomJs[i]] = boardParams.fifteenBall;
                ballsBoard[randomIs[i]][randomJs[i]] = boardParams.fifteenBall;
                fifteenBalls --; 
            }
            else if( twentyFiveBalls > 0 ) {
                board[randomIs[i]][randomJs[i]] = boardParams.twentyFiveBall;
                ballsBoard[randomIs[i]][randomJs[i]] = boardParams.twentyFiveBall;
                twentyFiveBalls --; 
            }
        }
    }
}

function initiateRandomArray(){
    var arr = [];
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 15; j++){
            arr.push(j)
        }
    }

    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}



function Start(shouldGetNewTime = true) {
    pacColor = "white";
    if(shouldGetNewTime){
        start_time = new Date();
    }
    
    createBoard();
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.key] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.key] = false;
    }, false);
    interval = setInterval(UpdatePosition, 250);
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[settings.upKey]) {
        return 1;
    }
    if (keysDown[settings.downKey]) {
        return 2;
    }
    if (keysDown[settings.leftKey]) {
        return 3;
    }
    if (keysDown[settings.rightKey]) {
        return 4;
    }
}

function Draw(diraction) {
    context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    lblScore.value = score;
    lblTime.value = Math.round(settings.timeLimitation - time_remaining);
    lblLives.value = lives;
    for (var i = 0; i < 15; i++) {
        for (var j = 0; j < 15; j++) {
            var center = new Object();
            center.x = i * 40 + 15;
            center.y = j * 40 + 15;
            if (board[i][j] === boardParams.pacman) {
                createPacman(center, diraction);
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
     
    if (!lost){
     var origI = pacmanPos.row;
     var origJ = pacmanPos.col;
     moveMonsters();
    var x = GetKeyPressed();
    if (x === 1) {
        pacmanLastDiraction = 1;
        if (pacmanPos.col > 0 && board[pacmanPos.row][pacmanPos.col - 1] !== 4) {
            pacmanPos.col--;
        }
    }
    if (x === 2) {
        pacmanLastDiraction = 2;
        if (pacmanPos.col < 14 && board[pacmanPos.row][pacmanPos.col + 1] !== 4) {
            pacmanPos.col++;
        }
    }
    if (x === 3) {
        pacmanLastDiraction = 3;
        if (pacmanPos.row > 0 && board[pacmanPos.row - 1][pacmanPos.col] !== 4) {
            pacmanPos.row--;
        }
    }
    if (x === 4) {
        pacmanLastDiraction = 4;
        if (pacmanPos.row < 14 && board[pacmanPos.row + 1][pacmanPos.col] !== 4) {
            pacmanPos.row++;
        }
    }
    if (board[pacmanPos.row][pacmanPos.col] === 1) {
        score++;
    }
    if(board[pacmanPos.row][pacmanPos.col] === boardParams.monster){
        lives--;
        score -= 10;
        if (lives > 0)
        {
            alert("Oh no..! You just got bitten by a ghost!\nOnly " + lives + " live(s) left.\nClick OK to continue playing.");
            initializeBoard();
            var shouldGetNewTime = false;
            Start(shouldGetNewTime);

        }
        else
        {
            window.clearInterval(interval);
            lost = true;
            alert("you Lost!");
        }
    }

    if(board[pacmanPos.row][pacmanPos.col] === boardParams.twentyFiveBall){
        score += 25;
        playTimeTwentyFiveBallAmount--;
    }
    
    if(board[pacmanPos.row][pacmanPos.col] === boardParams.fifteenBall){
        score += 15;
        playTimeFifteenBallAmount--;
    }

    if(board[pacmanPos.row][pacmanPos.col] === boardParams.fiveBall){
        score += 5;
        playTimeFiveBallAmount--;
    }

    board[origI][origJ] = 0;
    ballsBoard[origI][origJ] = 0;
    board[pacmanPos.row][pacmanPos.col] = 2;

    var currentTime = new Date();
    time_remaining = (currentTime - start_time) / 1000;
    if(settings.timeLimitation - time_remaining <= 10 && !styleChanged){
        styleChanged = true;
        originalStyle = $("#lblTime")[0].style;
        $("#lblTime")[0].style.color = 'red';
        $("#lblTime")[0].style.border = '1px solid red';
    }
    if (time_remaining >= settings.timeLimitation) {
        window.clearInterval(interval);
        lost = true;
        if(score < 150){
            alert("You can do better");
        }
        else
        {
            alert("We have a winner!!!");
        }
    }
    
        if(lost){
            
            if (confirm('Wanna have some more fun?')) {
                lost = false;
                initializeValues();
                Start();
            } else {
                toggleVisibility('Welcome');
            }
        }else{
            Draw();
        }
    }
}

function initializeValues(){
    playTimeTwentyFiveBallAmount = settings.twentyFiveBallAmount;
    playTimeFifteenBallAmount = settings.fifteenBallAmount;
    playTimeFiveBallAmount = settings.fiveBallAmount;
    playTimeTimeLimitation = settings.timeLimitation;
    score = 0;
    lives = 3;
    if(styleChanged){
        $("#lblTime")[0].style = originalStyle;
    }
    initializeBoard();
}

function initializeBoard() {
    for (let index = 0; index < board.length; index++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[index][j] != boardParams.wall) {
                board[index][j] = boardParams.path;
            }
        }
    }
}

function moveMonsters(){
    if(Math.random() <= 0.5){
        for (let i = 0; i < monstersPos.length; i++) {
            var availbe = getAvailble(monstersPos[i]);
            var rowDistance = monstersPos[i].row - pacmanPos.row;
            var colDistance = monstersPos[i].col - pacmanPos.col;
            var notChanged = true;
            while(notChanged && availbe.length != 0){
                var pos = availbe.pop();
                var isBetter =  (rowDistance != 0  && Math.abs(rowDistance) > Math.abs(pos.row - pacmanPos.row)) ||
                ( colDistance != 0 && Math.abs(colDistance) > Math.abs(pos.col - pacmanPos.col));
                if(isBetter){               
                    board[monstersPos[i].row][monstersPos[i].col] = ballsBoard[monstersPos[i].row][monstersPos[i].col];
                    if(board[pos.row][pos.col] != boardParams.monster){
                        monstersPos[i] = pos;
                        board[monstersPos[i].row][monstersPos[i].col] = boardParams.monster;
                        notChanged = false;
                    }
                }
            }
            if(notChanged && availbe.length == 0){
                availbe = getAvailble(monstersPos[i]);
                pos = availbe.pop();
                board[monstersPos[i].row][monstersPos[i].col] = ballsBoard[monstersPos[i].row][monstersPos[i].col];
                monstersPos[i] = pos;
                board[monstersPos[i].row][monstersPos[i].col] = boardParams.monster; 
            }
        }
    }
}

function getAvailble(monster){
   var availbe = [];
   //down
   if(monster.row + 1 < 15 && board[monster.row + 1][monster.col] != boardParams.wall){
         availbe.push({row: monster.row + 1, col: monster.col});
   }
   //up
   if(monster.row - 1 >= 0 && board[monster.row - 1][monster.col] != boardParams.wall){
        availbe.push({row: monster.row - 1, col: monster.col});
   }
   //rigth
   if(monster.col + 1 < 15 && board[monster.row][monster.col + 1] != boardParams.wall){
        availbe.push({row: monster.row, col: monster.col + 1});
   }
   //low
   if(monster.col - 1 >= 0 && board[monster.row][monster.col - 1] != boardParams.wall){
        availbe.push({row: monster.row, col: monster.col - 1});
   }
   return availbe;
        
}
