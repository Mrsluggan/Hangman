

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

    // Kollar hur mycket liv som är kvar
    if (health === 0) {
        console.log("u fucking lost Bitch");
        return;
    }

    // Kollar om bokstaven finns i ordet
    if (currentWord.includes(currentGuess)) {
        // Kollar om bokstaven redan har gissats
        if (currentWordCheck.includes(currentGuess)) {
            console.log("Bokstav finns redan");
        } else {
            // Kollar om det finns flera av samma bokstav i ordet
            for (let i = 0; i < currentWord.length; i++) {
                if (currentWord[i] === currentGuess) {
                    currentWordCheck[i] = currentGuess;
                }
            }

            // Uppdatera progress
            displayProgress.innerText = currentWordCheck.join(' ');

        }
    } else {
        // om inget stämde, minska livet med 1
        letterGueesed += currentGuess;
        health -= 1;
    }

    // Uppdatera display
    displayGuesses.innerHTML = letterGueesed;
    displayHealth.innerHTML = health;

    // Kontrollera om spelet är vunnet
    if (currentWordCheck.join('') === currentWord) {
        setTimeout(() => {
            if (confirm("Vill du spela igen?")) {
                restart();
            } else {
                alert("DU VANN");
            }
        }, 100);  // Fördröjning på 100 ms för att ge webbläsaren tid att uppdatera DOM
    }

}


function restart() {
    currentWordCheck = [];
    getRandomWord(listOfWords);
    generateButtons();

}



