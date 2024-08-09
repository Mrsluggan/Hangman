
var listOfWords = ["monkey", "cat", "dog"]
var currentWord = "cat";
var currentWordCheck = "";

var letterGueesed = "";
var numberOfGuesses = 0

var health = 5;



function getRandomWord(wordList) {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)]
    console.log(currentWord);
    return currentWord;
}
function guess(currentGuess) {
    currentWord = currentWord.split('').sort().join('');

    if (currentWord.includes(currentGuess)) {
        if (currentWordCheck.includes(currentGuess)) {
            console.log("Bokstav finns redan");

        } else {
            currentWordCheck += currentGuess;
            currentWordCheck = currentWordCheck.split('').sort().join('');
            console.log("rätt");
            if (currentWordCheck.includes(currentWord)) {
                console.log("då var alla ord hittade");
            }

        }
    } else {
        letterGueesed += currentGuess;
        console.log("fel");
        health -= 1;
    }
}

getRandomWord(listOfWords);
let displayCurrentWord = document.getElementById("word")
displayCurrentWord.append(currentWord)
let displayProgress = document.getElementById("progress")



let displayGuesses = document.getElementById("guesses")
let displayHealth = document.getElementById("health")
displayGuesses.append(letterGueesed)
displayHealth.append(health)



document.getElementById('guessForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let guessFromInput = document.getElementById('guessInput').value;
    guess(guessFromInput);
    displayGuesses.inn
    displayHealth.innerHTML = health;
});
