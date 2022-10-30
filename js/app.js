const cellEl = document.querySelectorAll("[data-cell]");
const boardEl = document.getElementById("board");
const resetButton = document.getElementById("resetButton");
const nextRoundButton = document.getElementById("nextRoundButton");
const winMessageTextEl = document.getElementById("winMessageText");
const pxWinsEl = document.getElementById("pxWins");
const poWinsEl = document.getElementById("poWins");

let isPOTurn = false;
var oWins = 0;
var xWins = 0;

const PLAYER_X = "x";
const PLAYER_O = "o";
const WIN_CONDISH = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

initialize();

resetButton.addEventListener("click", initialize);
nextRoundButton.addEventListener("click", nextRound);

//initialize function to clear board and prepare for clicks.

function initialize() {
  xWins = 0;
  oWins = 0;
  pxWinsEl.innerText = `${xWins}`;
  poWinsEl.innerText = `${oWins}`;
  winMessageTextEl.innerText = "";
  isPOTurn = false;
  cellEl.forEach((cell) => {
    cell.classList.remove(PLAYER_X);
    cell.classList.remove(PLAYER_O);
    cell.removeEventListener("click", takeTurn);
    cell.addEventListener("click", takeTurn, { once: true });
  });
}

//function that starts next round and switches turn

function nextRound() {
  updateScore();
  switchTurn();
  winMessageTextEl.innerText = "";
  cellEl.forEach((cell) => {
    cell.classList.remove(PLAYER_X);
    cell.classList.remove(PLAYER_O);
    cell.removeEventListener("click", takeTurn);
    cell.addEventListener("click", takeTurn, { once: true });
  });
}

//function to determine if win condition has beeen met and switch turns if not

function takeTurn(e) {
  const cell = e.target;
  const currentTurn = isPOTurn ? PLAYER_O : PLAYER_X;
  makeChoice(cell, currentTurn);
  if (checkForWin(currentTurn)) {
    endMatch(false);
  } else if (isDraw()) {
    endMatch(true);
  } else {
    switchTurn();
  }
}

//function to display results of the match and update scoreboard

function endMatch(draw) {
  if (draw) {
    winMessageTextEl.innerText = "It's a draw... Boo...";
  } else {
    winMessageTextEl.innerText = `${isPOTurn ? "O's" : "X's"} wins!`;
    isPOTurn ? oWins++ : xWins++;
    cellEl.forEach((cell) => {
      cell.removeEventListener("click", takeTurn);
    });
  }
}

//function to update scoreboard

function updateScore() {
  pxWinsEl.innerText = `${xWins}`;
  poWinsEl.innerText = `${oWins}`;
}

//function that determines if match is a draw

function isDraw() {
  return [...cellEl].every((cell) => {
    return (
      cell.classList.contains(PLAYER_X) || cell.classList.contains(PLAYER_O)
    );
  });
}

//function to make users choice on the cell clicked

function makeChoice(cell, currentTurn) {
  cell.classList.add(currentTurn);
}

//function to switch turns

function switchTurn() {
  isPOTurn = !isPOTurn;
}

//function to check for win against win condish variable

function checkForWin(currentTurn) {
  return WIN_CONDISH.some((line) => {
    return line.every((index) => {
      return cellEl[index].classList.contains(currentTurn);
    });
  });
}
