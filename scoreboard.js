import { getUser } from './User/userService.js';

export function loadScoreboard() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = "";

    const users = [];

    for (let i = 0; i < localStorage.length; i++) {
        const userName = localStorage.key(i);
        const user = getUser(userName);

        if (user) {
            users.push(user);
        }
    }

    users.sort((a, b) => b.score - a.score);

    users.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `${user.userName}: ${user.score}`;
        scoreboard.appendChild(li);
    });
}

export function loadCurrentUser(user) {
    const currentuserdiv = document.getElementById("currentuser");
    currentuserdiv.innerHTML = "";
    const currentUser = getUser(user);
    currentuserdiv.innerHTML = "current user: " + user

}   

export function saveScoreboard() {
    // Den här funktionen är för närvarande tom. Implementera om det behövs.
}
