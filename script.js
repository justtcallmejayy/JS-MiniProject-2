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

function levelUp() {
    level++;
    h2.innerText = `Your level is : ${level}`

    let randIndex = Math.floor(Math.random() * buttons.length);
    let randColor = buttons[randIndex];
    let randButton = document.querySelector(`.${randColor}`)
    console.log(randButton);
    console.log(randColor);
    console.log(randIndex);

    gameFlash(randButton);
}

//code for button pressed!

function btnPressed() {
    let btn = this;
    userFlash(btn);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
}


