const gameBoard = document.querySelector("main");
const turnMessage = document.querySelector("footer p:first-of-type");
const errorMessage = document.querySelector("footer p:last-of-type");

let turn = "X";
turnMessage.textContent = `It's ${turn}'s turn!`;

function toggleTurn() {
  turn = turn === "X" ? "O" : "X";
  turnMessage.textContent = `It's ${turn}'s turn!`;
}

function handleGameSpaceClick(event) {
  if (turn === "Z") {
    errorMessage.textContent = "The game is over!";
    return;
  }
  if (event.target.textContent) {
    errorMessage.textContent = "This space is already taken!";
    return;
  }
  event.target.textContent = turn;
  errorMessage.textContent = "";
  if (checkWinCondition()) {
    turnMessage.textContent = `Congratulations! ${turn} wins!`;
    turn = "Z";
  } else {
    toggleTurn();
  }
}

function checkWinCondition() {
  const spaces = gameBoard.children;
  const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
  ];
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      spaces[a].textContent &&
      spaces[a].textContent === spaces[b].textContent &&
      spaces[a].textContent === spaces[c].textContent
    ) {
      return true;
    }
  }
  return false;
}

// For each space in the game...
for (const gameSpace of gameBoard.childNodes) {
  gameSpace.addEventListener("click", handleGameSpaceClick);
}
