let gameSeq = [];
let userSeq = [];
const buttons = ["red", "yellow", "purple", "green"];

let started = false;
let level = 0;

// Accessing the heading element
const h2 = document.querySelector("h2");

// Event listener for starting the game
document.addEventListener("keypress", () => {
  if (!started) {
    updateScoreboard();
    started = true;
    levelUp();
  }
});

// Flash effect for buttons
function flashButton(btn, className) {
  btn.classList.add(className);
  setTimeout(() => {
    btn.classList.remove(className);
  }, 250);
}

// Game's flash effect
function gameFlash(btn) {
  flashButton(btn, "flash");
}

// User's flash effect
function userFlash(btn) {
  flashButton(btn, "userFlash");
}

// Level up function
function levelUp() {
  userSeq = []; // Reset user sequence for the new round
  level++;
  h2.innerText = `Your level is: ${level}`;

  const randIndex = Math.floor(Math.random() * buttons.length);
  const randColor = buttons[randIndex];
  const randButton = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randButton);
}

// Check the user's button click against the game sequence
function checkUserColor(indexLevel) {
  h2.innerText = `Current Level: ${level}`;

  if (userSeq[indexLevel] === gameSeq[indexLevel]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Press any key to try again. Your score: ${level}`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 200);
    reset();
  }
}

// Handle button press event
function btnPressed() {
  const btn = this;
  userFlash(btn);

  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkUserColor(userSeq.length - 1);
}

// Add event listeners to all buttons
const allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => btn.addEventListener("click", btnPressed));

function reset() {
  started = false;
  level = 0;
  userSeq = [];
  gameSeq = [];
  document.body.style.backgroundColor = "#FF6B6B"; // Bright red on game over
  setTimeout(() => {
    document.body.style.backgroundColor = "white";
  }, 500);

  h2.innerHTML = `Game Over! Press any key to restart. <br>Your Score: ${level}`;
}
function updateScoreboard() {
  document.getElementById("current-level").innerText = level;
  const highScore = localStorage.getItem("highScore") || 0;
  document.getElementById("high-score").innerText = highScore;
}

function reset() {
  const highScore = localStorage.getItem("highScore") || 0;

  if (level > highScore) {
    localStorage.setItem("highScore", level);
    alert(`New High Score: ${level}!`);
  } else {
    alert(`Your Score: ${level}. High Score: ${highScore}`);
  }

  started = false;
  level = 0;
  userSeq = [];
  gameSeq = [];
  updateScoreboard();
}
document.getElementById("reset-high-score").addEventListener("click", () => {
  localStorage.setItem("highScore", 0);
  updateScoreboard();
  alert("High Score has been reset!");
});
