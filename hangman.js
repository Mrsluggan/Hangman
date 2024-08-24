
import { createNewUser, logoutUser, loadScoreboard, setUser, getUser, updateScore } from './scoreboard.js';

var listOfWords = [
    "bird",
    "cat",
    "dog",
    "fox",
];
var currentUser = "";
var currentUserDiv = document.getElementById("currentuser");

var currentWord = "";
var currentWordCheck = [];
var audio = new Audio('sound/buttonSound.mp3');
var backgroundMusic = new Audio('sound/backgroundmusic.mp3');

var letterGuessed = "";
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
let scoreboardDiv = document.getElementById("scoreboardDiv");

displayGuesses.append(letterGuessed);
displayHealth.append(health);



function initilize() {
    if (localStorage.length >= 0) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            currentUser = (JSON.parse(localStorage.getItem(key))).userName;



        }
    } else if (localStorage.length > 1) {
        console.log('Error, something sus');
    } else {
        console.log('localStorage är tomt.');
    }

    if (currentUser) {

        let logoutButton = document.createElement("button")
        let buttonContainer = document.getElementById("button-container")

        logoutButton.innerText = "logout"
        logoutButton.addEventListener("click", () => {

            logoutUser();
            logoutButton.style.display = "none"

        })
        buttonContainer.appendChild(logoutButton);
    }
}
initilize();

function resetScreen() {
    backgroundMusic.pause();
    gameDiv.classList.remove('visible');
    gameDiv.style.display = "none";
    howToMenu.classList.remove('visible');
    howToMenu.style.display = "none";
    startMenu.classList.add('visible');
    scoreboardDiv.classList.remove('visible');
    scoreboardDiv.style.display = "none";
}

function registerUser() {
    if (!currentUser) {
        setTimeout(async () => {
            let newUsername = prompt("Skriv ditt namn, eller klicka på 'Avbryt' om du vill köra nameless");
            if (newUsername) {
                if (!checkName(newUsername)) {
                    let user = await createNewUser(newUsername);
                    setUser(user);
                    currentUser = user.userName
                    currentUserDiv.innerHTML = "current user: " + currentUser;

                } else {
                    let user = await createNewUser("namelessPlayer_" + Math.floor(Math.random() * 1000));
                    setUser(user);
                    currentUser = user.userName
                    currentUserDiv.innerHTML = "current user: " + currentUser;

                }
            } else {
                alert("Avbryt");
            }
        }, 100);
    }
}

startButton.addEventListener("click", () => {
    initilize();

    registerUser();
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

scoreboardbutton.addEventListener("click", () => {
    loadScoreboard();
    startMenu.classList.remove('visible');
    scoreboardDiv.classList.add('visible');
    scoreboardDiv.style.display = "block";
});

backtoMenu.forEach(element => {
    element.addEventListener("click", () => {
        resetScreen()
        restart();

    });
});

function getRandomWord(wordList) {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    displayProgress.innerText = ("_ ").repeat(currentWord.length);

    currentWordCheck = Array(currentWord.length).fill("_");

    console.log("current word, for yall cheaters " + currentWord);
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
            if (confirm("ordet var " + currentWord + ". Vill du spela igen?")) {
                restart();
            } else {
                restart();
                resetScreen()
                backgroundMusic.pause();
            }
        }, 100);
        return;
    }

    if (currentWord.includes(currentGuess)) {
        if (currentWordCheck.includes(currentGuess)) {
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

        updateScore(currentUser)
        setTimeout(() => {
            if (confirm("Grattis! Du vann. Vill du spela igen?")) {
                restart();
            } else {
                restart();
                resetScreen()

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
    initilize();

}


