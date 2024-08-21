var listOfWords = [
    "monkey", "cat", "dog", "fox", "rabbit", "pig",
    "lion", "horse", "sheep", "cow", "goat", "chicken"
];

var currentWord = "";
var currentWordCheck = [];
var audio = new Audio('/buttonSound.mp3');
var backgroundMusic = new Audio('/backgroundmusic.mp3');

var letterGuessed = "";
var numberOfGuesses = 0;
var health = 5;
var allLetters = "abcdefghijklmnopqrstuvwxyz";

var displayProgress = document.getElementById("progress");
var buttonDiv = document.getElementById("lettersDiv");

let displayGuesses = document.getElementById("guesses");
let displayHealth = document.getElementById("health");
let startButton = document.getElementById("startbutton");
let startMenu = document.getElementById("startmenu");
let gameDiv = document.getElementById("gameDiv");
let howToPlayButton = document.getElementById("howtoplaybutton");
let howToMenu = document.getElementById("howtoplay");
const elements = document.querySelectorAll('.backToMenu');
const backtoMenu = Array.from(elements);
let scoreboard = document.getElementById("scoreboard");
let scoreboardDiv = document.getElementById("scoreboarddiv");

displayGuesses.append(letterGuessed);
displayHealth.append(health);

startButton.addEventListener("click", () => {
    backgroundMusic.currentTime = 0;
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();

    startMenu.classList.remove('visible');

    gameDiv.classList.add('visible');
    gameDiv.style.display = "block";



    getRandomWord(listOfWords);
    generateButtons();
});

howToPlayButton.addEventListener("click", () => {
    startMenu.classList.remove('visible');
    howToMenu.classList.add('visible');
    howToMenu.style.display = "block";


});

backtoMenu.forEach(element => {
    element.addEventListener("click", () => {
        backgroundMusic.pause();
        gameDiv.classList.remove('visible');
        gameDiv.style.display = "none";
        howToMenu.classList.remove('visible');
        howToMenu.style.display = "none";
        startMenu.classList.add('visible');
        restart();

    });
});

function getRandomWord(wordList) {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    displayProgress.innerText = ("_ ").repeat(currentWord.length);

    currentWordCheck = Array(currentWord.length).fill("_");

    console.log(currentWord);
    return currentWord;
}

function playClick() {
    audio.currentTime = 0;
    audio.play();
}

function generateButtons() {
    buttonDiv.innerHTML = "";
    allLetters.split("").forEach((letter, index) => {
        let letterButton = document.createElement("button");
        letterButton.classList.add("active");
        letterButton.innerHTML = letter;
        letterButton.id = index;
        letterButton.addEventListener("click", () => {
            guess(letter);
            playClick();
            letterButton.disabled = true;
            letterButton.classList.remove("active");
            letterButton.classList.add("disabled");
        });
        buttonDiv.append(letterButton);
    });
}

function guess(currentGuess) {
    if (health === 1) {
        setTimeout(() => {
            if (confirm("Vill du spela igen?")) {
                restart();
            } else {
                restart();
                startMenu.classList.add('visible');
                gameDiv.classList.remove('visible');
                howToMenu.classList.remove('visible');
                backgroundMusic.pause();
            }
        }, 100);
        return;
    }

    if (currentWord.includes(currentGuess)) {
        if (currentWordCheck.includes(currentGuess)) {
            console.log("Bokstav finns redan");
        } else {
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === currentGuess) {
                    currentWordCheck[i] = currentGuess;
                }
            }
            displayProgress.innerText = currentWordCheck.join(' ');
        }
    } else {
        letterGuessed += currentGuess;
        health -= 1;
    }

    displayGuesses.innerHTML = letterGuessed;
    displayHealth.innerHTML = health;

    if (currentWordCheck.join('') === currentWord) {
        setTimeout(() => {
            if (confirm("Vill du spela igen?")) {
                restart();
            } else {
                restart();
                startMenu.classList.add('visible');
                gameDiv.classList.remove('visible');
                howToMenu.classList.remove('visible');
                backgroundMusic.pause();

            }
        }, 100);
    }
}

function restart() {
    currentWordCheck = [];
    letterGuessed = "";
    health = 5;
    displayProgress.innerText = ("_ ").repeat(currentWord.length);
    displayHealth.innerText = health;
    displayGuesses.innerText = letterGuessed;
    getRandomWord(listOfWords);
    generateButtons();


}


