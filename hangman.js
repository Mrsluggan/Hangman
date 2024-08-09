

var listOfWords = ["monkey", "cat", "dog"]
var currentWord = "";
var currentWordCheck = [];

var letterGueesed = "";
var numberOfGuesses = 0

var health = 5;

var allLetters = "abcdefghijklmnopqrstuvwxyz";
getRandomWord(listOfWords);

let displayCurrentWord = document.getElementById("word")
displayCurrentWord.append(currentWord)
var displayProgress = document.getElementById("progress")
var buttonDiv = document.getElementById("lettersDiv")



let displayGuesses = document.getElementById("guesses")
let displayHealth = document.getElementById("health")
displayGuesses.append(letterGueesed)
displayHealth.append(health)





function getRandomWord(wordList) {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)]
    console.log(currentWord);
    return currentWord;
}

function generateButtons() {
    let index = 0;
    for (let element of allLetters) {
        let letterButton = document.createElement("button")
        letterButton.innerHTML = element
        letterButton.id = index
        letterButton.addEventListener("click", (() => {
            guess(allLetters[letterButton.id]);
            letterButton.disabled = true;

        }))
        index += 1
        buttonDiv.append(letterButton)

    }

}


generateButtons();
function guess(currentGuess) {
    console.log(currentWord);

    if (health != 0) {
        if (currentWord.includes(currentGuess)) {
            if (currentWordCheck.includes(currentGuess)) {
                console.log("Bokstav finns redan");

            } else {

                currentWordCheck.push(currentGuess);
                currentWordCheck.sort((a, b) => {
                    return currentWord.indexOf(a) - currentWord.indexOf(b);
                });


                displayProgress.innerText = currentWordCheck.join(''); // "dog"
                if (displayProgress.innerText === currentWord) {
                    console.log("då var alla ord hittade");
                }

            }
        } else {
            letterGueesed += currentGuess;
            health -= 1;
        }



        displayGuesses.innerHTML = letterGueesed;
        displayHealth.innerHTML = health;
    } else {
        console.log("u fucking lost Bitch");

    }
}

