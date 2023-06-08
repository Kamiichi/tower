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

// ●の色を定義します。
const circleColor = "red";

const firstEnemy = new Enemy();

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
    `cell-${firstEnemy.y}-${firstEnemy.x - 1}`
  );
  currentCell.style.backgroundColor = circleColor;
}

const turn = () => {
  // 現在位置を取得
  let lastCell = document.getElementById(
    `cell-${firstEnemy.y}-${firstEnemy.x - 1}`
  );
  // 現在位置を白に戻す
  lastCell.style.backgroundColor = "white";
  // move関数実行
  firstEnemy.move();
  // 移動先の色を変更する
  let moveCell = document.getElementById(
    `cell-${firstEnemy.y}-${firstEnemy.x - 1}`
  );
  moveCell.style.backgroundColor = circleColor;
};

export { initMap, turn, grid };
