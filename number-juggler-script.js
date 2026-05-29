// ==========================
// GAME VARIABLES
// ==========================

let score = 0;
let level = 1;
let roundsInLevel = 0;
let totalIncorrect = 0;
let correctAnswer = "";
let timer;
let timeLeft;
let soundEnabled = true;

// ==========================
// SOUNDS
// ==========================

const soundCorrect = new Audio("sounds/correct.mp3");
const soundWrong = new Audio("sounds/wrong.mp3");
const soundReveal = new Audio("sounds/reveal.mp3");
const soundWarning = new Audio("sounds/warning.mp3");
const soundLevelUp = new Audio("sounds/levelup.mp3");

soundCorrect.volume = 0.5;
soundWrong.volume = 0.5;
soundReveal.volume = 0.3;
soundWarning.volume = 0.3;
soundLevelUp.volume = 0.5;

// ==========================
// PLAY SOUND
// ==========================

function playSound(sound){

    if(!soundEnabled) return;

    sound.pause();
    sound.currentTime = 0;

    sound.play().catch(()=>{
        console.log("Sound blocked");
    });
}

// ==========================
// START GAME BUTTON
// ==========================

const startGameBtn =
document.getElementById("startGameBtn");

if(startGameBtn){

    startGameBtn.addEventListener("click", function(){

        const introScreen =
        document.getElementById("introScreen");

        if(introScreen){
            introScreen.style.display = "none";
        }

        startGame();
    });
}

// ==========================
// START GAME
// ==========================

function startGame(){

    nextRound();
}

// ==========================
// UPDATE LIVES
// ==========================

function updateLives(){

    let remaining = 5 - totalIncorrect;

    let hearts = "";

    for(let i = 0; i < remaining; i++){
        hearts += "❤️ ";
    }

    const livesElement =
    document.querySelector(".top-bar-lives");

    if(livesElement){
        livesElement.innerText = hearts;
    }
}

// ==========================
// NEXT ROUND
// ==========================

function nextRound(){

    clearInterval(timer);

    roundsInLevel++;

    if(roundsInLevel > 15){

        playSound(soundLevelUp);

        alert("Level Complete!");

        level++;
        roundsInLevel = 1;
    }

    if(totalIncorrect >= 5){

        alert("Game Over! Final Score: " + score);

        location.reload();

        return;
    }

    const levelElement =
    document.getElementById("level");

    const scoreElement =
    document.getElementById("score");

    if(levelElement){
        levelElement.innerText = level;
    }

    if(scoreElement){
        scoreElement.innerText = score;
    }

    updateLives();

    // ==========================
    // TIMER SETTINGS
    // ==========================

    const timerDisplay =
    document.getElementById("timerDisplay");

    if(level >= 4){

        if(timerDisplay){
            timerDisplay.style.display = "block";
        }

        if(level === 4){
            startTimer(10);
        }
        else if(level === 5){
            startTimer(8);
        }
        else{
            startTimer(6);
        }

    } else {

        if(timerDisplay){
            timerDisplay.style.display = "none";
        }
    }

    // ==========================
    // LEVEL SETTINGS
    // ==========================

    if(level === 1){

        generateOddEven(20);
    }

    else if(level === 2){

        generateComparison(50);
    }

    else if(level === 3){

        if(Math.random() < 0.5){

            generateArithmetic(20);

        } else {

            generateOddEven(50);
        }
    }

    else if(level === 4){

        let r = Math.random();

        if(r < 0.33){

            generateOddEven(100);

        }
        else if(r < 0.66){

            generateComparison(200);

        }
        else{

            generateArithmetic(50);
        }
    }

    else{

        let r = Math.random();

        if(r < 0.33){

            generateOddEven(999);

        }
        else if(r < 0.66){

            generateComparison(999);

        }
        else{

            generateArithmetic(100);
        }
    }
}

// ==========================
// TIMER
// ==========================

function startTimer(seconds){

    timeLeft = seconds;

    let timerElement =
    document.getElementById("timerDisplay");

    if(timerElement){
        timerElement.innerText =
        "Time: " + timeLeft;
    }

    timer = setInterval(function(){

        timeLeft--;

        if(timerElement){
            timerElement.innerText =
            "Time: " + timeLeft;
        }

        if(timeLeft === 2){
            playSound(soundWarning);
        }

        if(timeLeft <= 0){

            clearInterval(timer);

            totalIncorrect++;

            playSound(soundWrong);

            nextRound();
        }

    },1000);
}

// ==========================
// CHECK ANSWER
// ==========================

function checkAnswer(choice){

    clearInterval(timer);

    if(choice === correctAnswer){

        score += 2;

        playSound(soundCorrect);

    } else {

        totalIncorrect++;

        playSound(soundWrong);
    }

    nextRound();
}

// ==========================
// ODD EVEN MODE
// ==========================

function generateOddEven(range){

    playSound(soundReveal);

    let num = Math.floor(Math.random() * range) + 1;

    const instruction =
    document.getElementById("instruction");

    const mainDisplay =
    document.getElementById("mainDisplay");

    const leftBtn =
    document.getElementById("leftBtn");

    const rightBtn =
    document.getElementById("rightBtn");

    if(instruction){
        instruction.innerText =
        "Is the number Odd or Even?";
    }

    if(mainDisplay){
        mainDisplay.innerHTML = num;
    }

    if(leftBtn){
        leftBtn.innerText = "ODD";
    }

    if(rightBtn){
        rightBtn.innerText = "EVEN";
    }

    if(num % 2 === 0){
        correctAnswer = "RIGHT";
    } else {
        correctAnswer = "LEFT";
    }
}

// ==========================
// COMPARISON MODE
// ==========================

function generateComparison(range){

    playSound(soundReveal);

    let num1 =
    Math.floor(Math.random() * range) + 1;

    let num2 =
    Math.floor(Math.random() * range) + 1;

    while(num1 === num2){

        num2 =
        Math.floor(Math.random() * range) + 1;
    }

    let askBigger = Math.random() < 0.5;

    const instruction =
    document.getElementById("instruction");

    const mainDisplay =
    document.getElementById("mainDisplay");

    const leftBtn =
    document.getElementById("leftBtn");

    const rightBtn =
    document.getElementById("rightBtn");

    if(instruction){

        if(askBigger){

            instruction.innerText =
            "Tap the BIGGER number side";

        } else {

            instruction.innerText =
            "Tap the SMALLER number side";
        }
    }

    if(mainDisplay){

        mainDisplay.innerHTML = `
            <div class="option-container">
                <div>${num1}</div>
                <div>${num2}</div>
            </div>
        `;
    }

    if(leftBtn){
        leftBtn.innerText = "LEFT";
    }

    if(rightBtn){
        rightBtn.innerText = "RIGHT";
    }

    if(askBigger){

        correctAnswer =
        (num1 > num2) ? "LEFT" : "RIGHT";

    } else {

        correctAnswer =
        (num1 < num2) ? "LEFT" : "RIGHT";
    }
}

// ==========================
// ARITHMETIC MODE
// ==========================

function generateArithmetic(range){

    playSound(soundReveal);

    let num1 =
    Math.floor(Math.random() * range) + 1;

    let num2 =
    Math.floor(Math.random() * range) + 1;

    let answer = num1 + num2;

    let wrongAnswer = answer + 2;

    let leftSide;
    let rightSide;

    if(Math.random() < 0.5){

        leftSide = answer;
        rightSide = wrongAnswer;

        correctAnswer = "LEFT";

    } else {

        leftSide = wrongAnswer;
        rightSide = answer;

        correctAnswer = "RIGHT";
    }

    const instruction =
    document.getElementById("instruction");

    const mainDisplay =
    document.getElementById("mainDisplay");

    const leftBtn =
    document.getElementById("leftBtn");

    const rightBtn =
    document.getElementById("rightBtn");

    if(instruction){

        instruction.innerText =
        "What is the correct answer?";
    }

    if(mainDisplay){

        mainDisplay.innerHTML = `
            <div class="arithmetic-container">

                <div class="equation">
                    ${num1} + ${num2} = ?
                </div>

                <div class="choices">
                    <div>${leftSide}</div>
                    <div>${rightSide}</div>
                </div>

            </div>
        `;
    }

    if(leftBtn){
        leftBtn.innerText = "FIRST";
    }

    if(rightBtn){
        rightBtn.innerText = "SECOND";
    }
}

// ==========================
// RANDOM MODE
// ==========================

function pickRandomType(range){

    let r = Math.random();

    if(r < 0.33){

        generateOddEven(range);

    }
    else if(r < 0.66){

        generateComparison(range);

    }
    else{

        generateArithmetic(20);
    }
}

// ==========================
// BUTTON EVENTS
// ==========================

const leftBtn =
document.getElementById("leftBtn");

const rightBtn =
document.getElementById("rightBtn");

if(leftBtn){

    leftBtn.addEventListener("click", function(){

        checkAnswer("LEFT");

    });
}

if(rightBtn){

    rightBtn.addEventListener("click", function(){

        checkAnswer("RIGHT");

    });
}

// ==========================
// BACK BUTTON
// ==========================

function exitGame(){

    let confirmExit =
    confirm("Exit the game?");

    if(confirmExit){

        // For iframe game suite
        if(window.parent &&
           window.parent.goBack){

            window.parent.goBack();

        } else {

            window.location.href =
            "index.html";
        }
    }
}

const backBtn =
document.getElementById("backBtn");

if(backBtn){

    backBtn.addEventListener("click",
    exitGame);
}

// ==========================
// INTRO BACK BUTTON
// ==========================

const introBackBtn =
document.getElementById("introBackBtn");

if(introBackBtn){

    introBackBtn.addEventListener("click",
    exitGame);
}

// ==========================
// SOUND TOGGLE
// ==========================

const soundBtn =
document.getElementById("soundBtn");

if(soundBtn){

    soundBtn.addEventListener("click",
    function(){

        soundEnabled = !soundEnabled;

        if(soundEnabled){

            this.innerText =
            "🔊 Sound ON";

        } else {

            this.innerText =
            "🔇 Sound OFF";
        }
    });
}

// ==========================
// KEYBOARD SUPPORT
// ==========================

document.addEventListener("keydown",
function(e){

    if(e.key === "ArrowLeft"){

        checkAnswer("LEFT");
    }

    if(e.key === "ArrowRight"){

        checkAnswer("RIGHT");
    }
});
