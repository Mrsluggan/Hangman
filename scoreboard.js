

class User {
    constructor(userName, score) {
        this.userName = userName;
        this.score = score;
    }
}

function createUser(userName = "Player_" + Math.floor(Math.random() * 1000), score = 0) {

    return new User(userName, score);
}
function getUser(userName) {
    const userData = localStorage.getItem(userName);
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
}

function setUser(user) {
    if (localStorage.getItem(user.userName) !== null) {
        console.log("denna person finns redan");
    } else {
        localStorage.setItem(user.userName, JSON.stringify(user));
    }
}


function updateScore(user) {
    user.score += 1;
    localStorage.setItem(user.userName, JSON.stringify(user));

}


setUser(createUser("fucker", 1000));











function loadScoreboard() {

    const scoreboard = document.getElementById("scoreboard");

    scoreboard.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {

        const userName = localStorage.key(i);

        const user = getUser(userName);

        if (user) {

            const li = document.createElement("li");

            li.innerHTML = `${user.userName}: ${user.score}`;

            scoreboard.appendChild(li);

        }

    }



}
function saveScoreboard() {

}



loadScoreboard();