const CROSS_CLASS = "cross";
const CIRCLE_CLASS = "circle";
const WINNING_COMBOS = [
  //horizontal combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  //vertical combos
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //diagonal combos
  [0, 4, 8],
  [2, 4, 6],
];
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const winningMsgContainer = document.querySelector(".winning-msg");
const winningMessageText = document.getElementById("winning-msg-text");
const restartButton = document.getElementById("restart-btn");
let crossTurn;
restartButton.addEventListener("click", initGame);

initGame();

function initGame() {
  crossTurn = true;
  winningMsgContainer.classList.remove("show");

  cells.forEach((cellElement) => {
    cellElement.classList.remove(CIRCLE_CLASS);
    cellElement.classList.remove(CROSS_CLASS);
    cellElement.removeEventListener("click", handleClick);
    cellElement.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverState();
}

// function resetGame() {
//   crossTurn = true;
//
//   cells.forEach((cellElement) => {});
//   setBoardHoverState();
// }

function handleClick(event) {
  //console.log("clicked");

  /* 
  
  1. check whose turn
  2. place marker
  3. check if curr player won
  4. check if draw
  5. switch turns
  
  
  */
  const targetCell = event.target;
  const currClass = crossTurn ? CROSS_CLASS : CIRCLE_CLASS;
  placeMarker(targetCell, currClass);
  if (checkIfWon(currClass)) {
    console.log(`${currClass} WON!`);
    finishGame(false);
  } else if (isDraw()) {
    finishGame(true);
  } else {
    switchTurns();
    setBoardHoverState();
  }
}

function placeMarker(targetCell, currClass) {
  targetCell.classList.add(currClass);
}

function switchTurns() {
  crossTurn = !crossTurn;
}

function setBoardHoverState() {
  if (crossTurn) {
    board.classList.remove(CIRCLE_CLASS);
    board.classList.add(CROSS_CLASS);
  } else {
    board.classList.remove(CROSS_CLASS);
    board.classList.add(CIRCLE_CLASS);
  }
}

function checkIfWon(currClass) {
  return WINNING_COMBOS.some((combination) => {
    return combination.every((idx) => {
      return cells[idx].classList.contains(currClass);
    });
  });
}

//checks if each cell has a class or not
function isDraw() {
  return [...cells].every((cell) => {
    return (
      cell.classList.contains(CROSS_CLASS) ||
      cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

//displays winning message or match drawn message
function finishGame(draw) {
  if (draw) {
    winningMessageText.innerText = "Match Drawn!";
  } else {
    winningMessageText.innerText = `${crossTurn ? "X" : "O"}  Wins!`;
  }

  winningMsgContainer.classList.add("show");
}
