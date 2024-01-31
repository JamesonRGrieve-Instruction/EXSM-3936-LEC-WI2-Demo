const gameBoard = document.querySelector("main");
function generateBoard(target) {
  for (let rowNumber = 1; rowNumber <= 8; rowNumber++) {
    const row = document.createElement("div");
    row.id = `row-${rowNumber}`;
    for (let colNumber = 97; colNumber <= 104; colNumber++) {
      const cell = document.createElement("div");
      cell.id = `${String.fromCharCode(colNumber)}${rowNumber}`;
      row.appendChild(cell);
    }
    target.appendChild(row);
  }
}
generateBoard(gameBoard);
