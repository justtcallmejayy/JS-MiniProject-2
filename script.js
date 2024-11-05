let gameSeq = [];
let userSeq = [];
let buttons = ["red", "yellow", "purple", "green"];


let started = false;
let level = 0;

// Accessing all the elements:
let h2 = document.querySelector('h2');

// Lets check if wether any ot the buttoen is pressed
document.addEventListener("keypress", () => {
    if (started == false) {
        console.log("Games has been started!");
        started = true;
        levelUp();
    }
})

//  Now below fnc below will track the level & and handle the background color for the game buttons

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");

    },
        250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");

    },
        250);
}
// level up fnc is very imp here
//also i am add userSeq[] empty so that it can start over again for the user everytime the new color flashes!
//This is 

function levelUp() {
    userSeq=[]; //This will reset the game sequence
    level++;
    h2.innerText = `Your level is : ${level}`

    let randIndex = Math.floor(Math.random() * buttons.length);
    let randColor = buttons[randIndex];
    let randButton = document.querySelector(`.${randColor}`)
    // console.log(randButton);
    // console.log(randColor);
    // console.log(randIndex);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randButton);
}

function checkUserColor(indexLevel) {
    // console.log(`Current Level : ${level}`);
    h2.innerText = `Current Level : ${level}`;

    if (userSeq[indexLevel] === gameSeq[indexLevel]) {
        // console.log("Similair value");
        if (userSeq.length == gameSeq.length) {
            setTimeout (levelUp,1000);
        }
        // h2.innerText = `Keep going you `
    }
    else {
        // console.log(`Game is over, Please try again by resetting the level`);
        h2.innerText = `Game is over, Please try again by resetting the level`

    }
}

//code for button pressed!

function btnPressed() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    //logging the level of the user, the current level value will be the same as the current sequence and user score
    checkUserColor(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
}


