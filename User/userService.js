import { User } from './User.js';

export function createUser(userName = "Player_" + Math.floor(Math.random() * 1000), score = 0) {
    return new User(userName, score);
}

export function getUser(userName) {
    const userData = localStorage.getItem(userName);
    if (userData) {
        return JSON.parse(userData);
    }
    return null;
}

export function setUser(user) {
    if (localStorage.getItem(user.userName) !== null) {
        console.log("Denna person finns redan");
    } else {
        localStorage.setItem(user.userName, JSON.stringify(user));
    }
}

export function updateScore(user) {
    user.score += 1;
    localStorage.setItem(user.userName, JSON.stringify(user));
}
