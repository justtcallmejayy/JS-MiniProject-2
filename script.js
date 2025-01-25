let gameSeq = [];
let userSeq = [];
const buttons = ["red", "yellow", "purple", "green"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");

// Event listener for starting the game with the space bar
document.addEventListener("keydown", (event) => {
  if (!started && event.code === "Space") {
    console.log("Space bar pressed. Game starting...");
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
function gameFlash(color) {
  const btn = document.querySelector(`.${color}`);
  if (!btn) return; // Ensure the button exists
  flashButton(btn, "flash");
}

// User's flash effect
function userFlash(btn) {
  flashButton(btn, "userFlash");
}

// Level up function
function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Your level is: ${level}`; // Update level text

  const randIndex = Math.floor(Math.random() * buttons.length);
  const randColor = buttons[randIndex];

  gameSeq.push(randColor);
  console.log("Game sequence:", gameSeq);

  let i = 0;
  const interval = setInterval(() => {
    if (i >= gameSeq.length) {
      clearInterval(interval);
      return;
    }
    gameFlash(gameSeq[i]);
    i++;
  }, 800);

  updateScoreboard();
}

// Check user's input
function checkUserColor(indexLevel) {
  if (userSeq[indexLevel] === gameSeq[indexLevel]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Press Space to try again. Your score: ${level}`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "white";
    }, 200);
    reset();
  }
}

// Handle button press event
function btnPressed() {
  if (!started) return;

  const btn = this;
  userFlash(btn);

  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkUserColor(userSeq.length - 1);
}

// Add event listeners to all buttons
const allBtns = document.querySelectorAll(".btn");
if (allBtns.length > 0) {
  allBtns.forEach((btn) => btn.addEventListener("click", btnPressed));
} else {
  console.error(
    "No buttons found! Ensure your HTML contains elements with the class 'btn'."
  );
}

// Update the scoreboard
function updateScoreboard() {
  const currentLevelElem = document.getElementById("current-level");
  const highScoreElem = document.getElementById("high-score");

  if (currentLevelElem && highScoreElem) {
    currentLevelElem.innerText = level;
    const highScore = localStorage.getItem("highScore") || 0;
    highScoreElem.innerText = highScore;
  } else {
    console.error(
      "Scoreboard elements not found! Ensure your HTML contains #current-level and #high-score elements."
    );
  }
}

// Reset the game
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

// Reset high score
const resetHighScoreBtn = document.getElementById("reset-high-score");
if (resetHighScoreBtn) {
  resetHighScoreBtn.addEventListener("click", () => {
    localStorage.setItem("highScore", 0);
    updateScoreboard();
    alert("High Score has been reset!");
  });
} else {
  console.error(
    "Reset high score button not found! Ensure your HTML contains an element with id 'reset-high-score'."
  );
}
