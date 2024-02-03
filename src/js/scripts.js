const blackClass = "fa-solid";
const whiteClass = "fa-regular";
const backRow = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
const gameBoard = document.querySelector("main");

function generateBoard(target) {
  for (let rowNumber = 8; rowNumber >= 1; rowNumber--) {
    const row = document.createElement("div");
    row.id = `row-${rowNumber}`;
    for (let colNumber = 97; colNumber <= 104; colNumber++) {
      const cell = document.createElement("div");
      cell.id = `${String.fromCharCode(colNumber)}${rowNumber}`;
      cell.addEventListener("click", movePiece);
      if ([1, 2, 7, 8].includes(rowNumber)) {
        const newPiece = document.createElement("i");
        if (rowNumber === 1 || rowNumber === 8) {
          newPiece.classList.add(`fa-chess-${backRow[colNumber - 97]}`);
        } else if (rowNumber === 2 || rowNumber === 7) {
          newPiece.classList.add(`fa-chess-pawn`);
        }
        newPiece.classList.add(rowNumber >= 4 ? blackClass : whiteClass);
        newPiece.addEventListener("click", selectPiece);
        cell.appendChild(newPiece);
      }
      row.appendChild(cell);
    }
    target.appendChild(row);
  }
}
generateBoard(gameBoard);

function selectPiece(event) {
  event.stopPropagation();
  const targetPiece = event.target;
  if (targetPiece.tagName === "I" && document.querySelector(".selected") === null) {
    targetPiece.classList.add("selected");
    const possibleMoves = flagPossibleMoves(targetPiece.classList[0].split("-")[2], targetPiece.parentElement.id);
    console.log(possibleMoves);
    for (const move of possibleMoves) {
      gameBoard.querySelector(`#${move}`).classList.add("possible");
    }
    //const oldCell = piece.parentElement;
    //const oldRow = oldCell.parentElement;
    //const oldCol = oldRow.id;
    //const newRow = gameBoard.querySelector("#row-5");
    //const newCell = newRow.querySelector("#d5");
    //newCell.appendChild(piece);
  }
}
function movePiece(event) {
  const targetSpace = event.target;
  const selectedPiece = gameBoard.querySelector(".selected");
  if (selectedPiece && targetSpace.classList.contains("possible")) {
    targetSpace.appendChild(selectedPiece);
    selectedPiece.classList.remove("selected");

    const possibleMoves = gameBoard.querySelectorAll(".possible");
    for (const move of possibleMoves) {
      move.classList.remove("possible");
    }
  }
}
function flagPossibleMoves(pieceType, origin) {
  // Considering pieceType and origin, return an array of all possible spaces on the board (not consider which spaces are occupied)
  // origin is a string representing a space in chess notation, pieceType is a string representing the name of the piece in lowercase
  const possibleMoves = [];
  if (pieceType === "pawn") {
    // For now, return the space in front/behind of the pawn and its four diagonals, the rest of the logic will be handled elsewhere
    const [col, row] = origin.split("");
    possibleMoves.push(`${col}${parseInt(row) + 1}`);
    possibleMoves.push(`${col}${parseInt(row) + 2}`);
    possibleMoves.push(`${String.fromCharCode(col.charCodeAt(0) - 1)}${parseInt(row) + 1}`);
    possibleMoves.push(`${String.fromCharCode(col.charCodeAt(0) + 1)}${parseInt(row) + 1}`);
    possibleMoves.push(`${col}${parseInt(row) - 1}`);
    possibleMoves.push(`${col}${parseInt(row) - 2}`);
    possibleMoves.push(`${String.fromCharCode(col.charCodeAt(0) - 1)}${parseInt(row) - 1}`);
    possibleMoves.push(`${String.fromCharCode(col.charCodeAt(0) + 1)}${parseInt(row) - 1}`);
  }
  // Remove any spaces that are outside the bounds of the board (a-h, 1-8)
  return possibleMoves.filter((space) => {
    const [col, row] = space.split("");
    return col.charCodeAt(0) >= 97 && col.charCodeAt(0) <= 104 && row >= 1 && row <= 8;
  });
}
/*
// Copilot generated this, untested.
function filterPawnMoves(possibleMoves, origin, isBlack) {
  // Remove any spaces that are occupied by a piece of the same color
  const filteredMoves = [];
  for (const move of possibleMoves) {
    const targetSpace = gameBoard.querySelector(`#${move}`);
    if (targetSpace.children.length === 0) {
      filteredMoves.push(move);
    } else {
      const targetPiece = targetSpace.children[0];
      if (isBlack && targetPiece.classList.contains(blackClass)) {
        filteredMoves.push(move);
      } else if (!isBlack && targetPiece.classList.contains(whiteClass)) {
        filteredMoves.push(move);
      }
    }
  }
  return filteredMoves;
}
*/
