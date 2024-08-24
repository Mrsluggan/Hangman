const DATABASE_URL = "https://hangman-backend-7wn5.onrender.com/";
console.log("test");

export async function loadScoreboard() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = "";

    const response = await fetch(DATABASE_URL);
    scoreboard.innerHTML = "Might take a while, not paying to host this...";
    const data = await response.json();
    scoreboard.innerHTML = "";
    data.forEach(element => {
        let displayUser = document.createElement("li");
        displayUser.innerText = element.userName + ": " + element.score + " points";
        scoreboard.append(displayUser);
    });
    console.log("");
}

export function setUser(user) {
    localStorage.setItem(user.userName, JSON.stringify(user));
}

export function loadCurrentUser(user) {
    const currentuserdiv = document.getElementById("currentuser");
    currentuserdiv.innerHTML = "";
    const currentUser = getUser(user);
    currentuserdiv.innerHTML = "current user: " + user;
}

export function logoutUser() {
    localStorage.clear();
}

export async function createNewUser(username) {
    try {
        const response = await fetch(DATABASE_URL + "users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: username,
                score: 0
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
    }
}

export async function updateScore(username) {
    let currentUser = JSON.parse(localStorage.getItem(username));
    currentUser.score += 1;
    localStorage.setItem(username, JSON.stringify(currentUser));

    await fetch(DATABASE_URL + `users/${username}/score`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function getUser(username) {
    const response = await fetch(DATABASE_URL + `users/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export async function getUsers() {
    const response = await fetch(DATABASE_URL + `users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}
