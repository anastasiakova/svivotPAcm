// const context = canvas.getContext("2d");
// const shape = new Object();
// var board;
// var score;
// var pac_color;
// var start_time;
// var time_elapsed;
// var interval;

var settings = {
    // keye
    upKey: String,
    downKey: String,
    leftKey: String,
    rightKey: String,

    // balls
    twentyFiveBallColor: String,
    fifteenBallColor: String, 
    fiveBallColor: String,

    twentyFiveBallAmount: Number,
    fifteenBallAmount: Number,
    fiveBallAmount: Number,

    // time
    timeLimitation: Number,

    // monsters
    numberOfMonsters: Number
};

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

// Start();

// function Start() {
//     board = new Array();
//     score = 0;
//     pac_color = "yellow";
//     var cnt = 100;
//     var food_remain = 50;
//     var pacman_remain = 1;
//     start_time = new Date();
//     for (var i = 0; i < 10; i++) {
//         board[i] = new Array();
//         //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
//         for (var j = 0; j < 10; j++) {
//             if ((i === 3 && j === 3) || (i === 3 && j === 4) || (i === 3 && j === 5) || (i === 6 && j === 1) || (i === 6 && j === 2)) {
//                 board[i][j] = 4;
//             } else {
//                 var randomNum = Math.random();
//                 if (randomNum <= 1.0 * food_remain / cnt) {
//                     food_remain--;
//                     board[i][j] = 1;
//                 } else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
//                     shape.i = i;
//                     shape.j = j;
//                     pacman_remain--;
//                     board[i][j] = 2;
//                 } else {
//                     board[i][j] = 0;
//                 }
//                 cnt--;
//             }
//         }
//     }
//     while (food_remain > 0) {
//         var emptyCell = findRandomEmptyCell(board);
//         board[emptyCell[0]][emptyCell[1]] = 1;
//         food_remain--;
//     }
//     keysDown = {};
//     addEventListener("keydown", function (e) {
//         keysDown[e.code] = true;
//     }, false);
//     addEventListener("keyup", function (e) {
//         keysDown[e.code] = false;
//     }, false);
//     interval = setInterval(UpdatePosition, 250);
// }


// function findRandomEmptyCell(board) {
//     var i = Math.floor((Math.random() * 9) + 1);
//     var j = Math.floor((Math.random() * 9) + 1);
//     while (board[i][j] !== 0) {
//         i = Math.floor((Math.random() * 9) + 1);
//         j = Math.floor((Math.random() * 9) + 1);
//     }
//     return [i, j];
// }

// /**
//  * @return {number}
//  */
// function GetKeyPressed() {
//     if (keysDown['ArrowUp']) {
//         return 1;
//     }
//     if (keysDown['ArrowDown']) {
//         return 2;
//     }
//     if (keysDown['ArrowLeft']) {
//         return 3;
//     }
//     if (keysDown['ArrowRight']) {
//         return 4;
//     }
// }

// function Draw() {
//     context.clearRect(0, 0, canvas.width, canvas.height); //clean board
//     lblScore.value = score;
//     lblTime.value = time_elapsed;
//     for (var i = 0; i < 10; i++) {
//         for (var j = 0; j < 10; j++) {
//             var center = new Object();
//             center.x = i * 60 + 30;
//             center.y = j * 60 + 30;
//             if (board[i][j] === 2) {
//                 context.beginPath();
//                 context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
//                 context.lineTo(center.x, center.y);
//                 context.fillStyle = pac_color; //color
//                 context.fill();
//                 context.beginPath();
//                 context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
//                 context.fillStyle = "black"; //color
//                 context.fill();
//             } else if (board[i][j] === 1) {
//                 context.beginPath();
//                 context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
//                 context.fillStyle = "black"; //color
//                 context.fill();
//             } else if (board[i][j] === 4) {
//                 context.beginPath();
//                 context.rect(center.x - 30, center.y - 30, 60, 60);
//                 context.fillStyle = "grey"; //color
//                 context.fill();
//             }
//         }
//     }


// }

// function UpdatePosition() {
//     board[shape.i][shape.j] = 0;
//     var x = GetKeyPressed();
//     if (x === 1) {
//         if (shape.j > 0 && board[shape.i][shape.j - 1] !== 4) {
//             shape.j--;
//         }
//     }
//     if (x === 2) {
//         if (shape.j < 9 && board[shape.i][shape.j + 1] !== 4) {
//             shape.j++;
//         }
//     }
//     if (x === 3) {
//         if (shape.i > 0 && board[shape.i - 1][shape.j] !== 4) {
//             shape.i--;
//         }
//     }
//     if (x === 4) {
//         if (shape.i < 9 && board[shape.i + 1][shape.j] !== 4) {
//             shape.i++;
//         }
//     }
//     if (board[shape.i][shape.j] === 1) {
//         score++;
//     }
//     board[shape.i][shape.j] = 2;
//     var currentTime = new Date();
//     time_elapsed = (currentTime - start_time) / 1000;
//     if (score >= 20 && time_elapsed <= 10) {
//         pac_color = "green";
//     }
//     if (score === 50) {
//         window.clearInterval(interval);
//         window.alert("Game completed");
//     } else {
//         Draw();
//     }
// }

// function GameSettings(){
//     this.moveUp = 'ArrowUp';
//     this.moveDown = 'ArrowDown';
//     this.moveLeft = 'ArrowLeft';
//     this.moveRight = 'ArrowRight';

//     this.ballRange = '70';
//     this.timeLimitation = '60';
//     this.numOfMonsters = '1';

//     this.RandomizeSettings = function(){
//         this.ballRange = Math.floor((Math.random() * 90) + 50);
//         this.timeLimitation = Math.floor((Math.random() * 180) + 60);
//         this.numOfMonsters = Math.floor((Math.random() * 3) + 1);
//     }

//     this.setBallRange = function(rng){
//         if (50 <= rng && rng <= 90){
//             this.ballRange = rng;
//         }
//     }

//     this.setTimeLimitation = function(limit){
//         if(60 <= limit && limit <= 180){
//             this.timeLimitation = limit;
//         }
        
//     }

//     this.setNumOfMonsters = function(monsters){
//         if (1 <= monsters && monsters <= 3){
//             this.numOfMonsters = monster;
//         }
        
//     }
// }