
var playing = true;
var listOfWords = ["monkey", "cat", "dog", "fox", "rabbit", "pig", "lion", "horse", "sheep", "cow", "goat", "chicken"]
var currentWord = "";
var currentWordCheck = [];
var audio = new Audio('/buttonSound.mp3');
var letterGueesed = "";
var numberOfGuesses = 0

var health = 5;

var allLetters = "abcdefghijklmnopqrstuvwxyz";

let displayCurrentWord = document.getElementById("word")
displayCurrentWord.append(currentWord)
var displayProgress = document.getElementById("progress")
var buttonDiv = document.getElementById("lettersDiv")



let displayGuesses = document.getElementById("guesses")
let displayHealth = document.getElementById("health")
displayGuesses.append(letterGueesed)
displayHealth.append(health)



getRandomWord(listOfWords);


function getRandomWord(wordList) {


    currentWord = wordList[Math.floor(Math.random() * wordList.length)]
    displayCurrentWord.innerText = currentWord
    displayProgress.innerText = ("_ ").repeat(currentWord.length)
    for (element of currentWord) {
        currentWordCheck.push("_")
    }

    console.log(currentWord);
    return currentWord;
}

function playClick() {
    audio.currentTime = 0
    audio.play();
}
function generateButtons() {

    buttonDiv.innerHTML = "";
    let index = 0;

    for (let element of allLetters) {
        let letterButton = document.createElement("button")
        letterButton.innerHTML = element
        letterButton.id = index
        letterButton.addEventListener("click", (() => {
            guess(allLetters[letterButton.id]);
            playClick();
            letterButton.disabled = true;

        }))
        index += 1
        buttonDiv.append(letterButton)

    }

}


generateButtons();



function guess(currentGuess) {
    console.log(currentWord);

    if (health === 0) {
        console.log("u fucking lost Bitch");
        return;
    }

    if (currentWord.includes(currentGuess)) {
        if (currentWordCheck.includes(currentGuess)) {
            console.log("Bokstav finns redan");
        } else {
            // Uppdatera currentWordCheck med den gissade bokstaven
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === currentGuess) {
                    currentWordCheck[i] = currentGuess;
                }
            }

            console.log(currentWordCheck);
            displayProgress.innerText = currentWordCheck.join(' ');
            console.log(currentWordCheck.join('') + currentWord);
        }
    } else {
        letterGueesed += currentGuess;
        health -= 1;
    }

    // Uppdatera display
    displayGuesses.innerHTML = letterGueesed;
    displayHealth.innerHTML = health;

    // Kontrollera om spelet är vunnet
    if (currentWordCheck.join('') === currentWord) {
        if (confirm("Vill du spela igen?")) {
            restart();
        } else {
            alert("DU VANN");
        }
    }
}


function restart() {
    currentWordCheck = [];
    getRandomWord(listOfWords);
    generateButtons();

}


