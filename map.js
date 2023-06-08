import Enemy from "./Enemy.js";

const grid = [
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  [9, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
  [9, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 9],
  [9, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 9],
  [0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
  [9, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 9],
  [9, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 9],
  [9, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 9],
  [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
  [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
];

// 開始位置を定義します。(この例では右端の通路を開始位置とします。)
let currentPosition = { x: 19, y: 4 };

// ●の色を定義します。
const circleColor = "red";

function initMap() {
  const cellSize = (window.innerWidth * 0.7) / 20;
  document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);

  const gridContainer = document.getElementById("grid");
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.id = `cell-${i}-${j}`; // 各セルに固有のidを割り当てます。

      switch (grid[i][j]) {
        case 9:
          cell.classList.add("border");
          break;
        case 1:
          cell.classList.add("black");
          break;
        case 0:
          cell.classList.add("white");
          break;
      }
      gridContainer.appendChild(cell);
    }
  }

  let currentCell = document.getElementById(
    `cell-${currentPosition.y}-${currentPosition.x}`
  );
  currentCell.style.backgroundColor = circleColor;
  console.log(document);
}
export { initMap };
