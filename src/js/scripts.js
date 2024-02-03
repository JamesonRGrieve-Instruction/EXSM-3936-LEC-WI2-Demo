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
      if ([1, 2, 7, 8].includes(rowNumber)) {
        const newPiece = document.createElement("i");
        if (rowNumber === 1 || rowNumber === 8) {
          newPiece.classList.add(`fa-chess-${backRow[colNumber - 97]}`);
        } else if (rowNumber === 2 || rowNumber === 7) {
          newPiece.classList.add(`fa-chess-pawn`);
        }
        newPiece.classList.add(rowNumber >= 4 ? blackClass : whiteClass);
        cell.appendChild(newPiece);
      }
      row.appendChild(cell);
    }
    target.appendChild(row);
  }
}
generateBoard(gameBoard);
