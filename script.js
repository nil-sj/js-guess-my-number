'use strict';
// Done: generate a random number
// Done: when the button is clicked, check if the input score is high low or equal.
// Done: if equal - show that it is correct, update score, update high score
// Done: if greater - show that it is too high, update score
// Done: if lower - show that it is too low, update score
// Done: again button resets a process, but not high score.


// setting the range 
const minNumber = 1, maxNumber = 20;


let highScore = 0;
let score, number, guess;


const scorePlaceHolder = document.querySelector(".score");
const highScorePlaceHolder = document.querySelector(".highscore");
const minNumberPlaceHolder = document.querySelector(".min-number");
const maxNumberPlaceHolder = document.querySelector(".max-number");
const numberPlaceHolder = document.querySelector(".number");
const againButton = document.querySelector(".btn.again");
const checkButton = document.querySelector(".btn.check");
const guessInput = document.querySelector(".guess");
const messagePlaceHolder = document.querySelector(".message");

// different messages
const initialMessage = "Start guessing...";
const correctMessage = "🎉 Correct Number!";
const tooLowMessage = "📉 Too Low!";
const tooHighMessage = "📈 Too High!";  

function setChoiceLimits() {
    minNumberPlaceHolder.innerText = minNumber;
    maxNumberPlaceHolder.innerText = maxNumber;
}

function generateRandomNumber(low, high) {
    return low + Math.floor(Math.random()*(high-low+1));
}

function startGame() {
    score = maxNumber - minNumber + 1;
    updateScore(score, 0);
    setChoiceLimits();
    number = generateRandomNumber(minNumber, maxNumber);
    updateMessage(initialMessage);
    document.body.style.backgroundColor = "#222";
    guessInput.value = "";
    numberPlaceHolder.innerText = "?";
}

function updateScore(currScore, scoreChange) {
    score = currScore + scoreChange;
    scorePlaceHolder.innerText = score;
}

function updateMessage(message) {
    messagePlaceHolder.innerText = message;
}

function updateHighScore(currHighScore, newScore) {
    highScore = newScore > currHighScore ? newScore : currHighScore;
    highScorePlaceHolder.innerText = highScore; 
}

function assessTurn() {
    // console.log(`type of guess is ${typeof guess} and type of number ${typeof number}`);
    if (guess >= minNumber && guess <= maxNumber) {
        //valid guess, and therefore assess it
        let scoreChange = -1;
        if (guess === number) {
            console.log(`Number is ${number}, Guess is ${guess}, Correct Guess!`);
            //update high score
            scoreChange = 0;
            updateHighScore(highScore, score);
            // feedback with background color and result text...
            updateMessage(correctMessage);
            document.body.style.backgroundColor = "#60b347";
            numberPlaceHolder.innerText = number;
        } else if (guess > number) {
            console.log(`Number is ${number}, Guess is ${guess}, Guess is too high!`);
            // feedback with result text...
            updateMessage(tooHighMessage);
        } else {
            console.log(`Number is ${number}, Guess is ${guess}, Guess is too low!`);
            // feedback with result text...
            updateMessage(tooLowMessage);
        }
        // update score...
        updateScore(score, scoreChange);
    } else {
        //invalid guess
        window.alert(`Please guess a number between ${minNumber} and ${maxNumber}.\nTake your turn again!`);
    }
}

againButton.addEventListener("click", startGame);
guessInput.addEventListener("blur", (event) => {
    guess = Number(event.target.value);
});
checkButton.addEventListener("click", assessTurn);

startGame();

