import Enemy from "./Enemy.js";
import { grid } from "./constant.js";

// ●の色を定義します。
const circleColor = "red";

const enemylist = [];

let turnCount = 0;

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
}

const turn = () => {
  if (turnCount % 4 === 0) {
    enemylist.push(new Enemy());
  }

  enemylist.forEach((e) => {
    // 現在位置を取得
    let lastCell = document.getElementById(`cell-${e.y}-${e.x - 1}`);
    // 現在位置を白に戻す
    lastCell.style.backgroundColor = "white";
    // move関数実行
    e.move();
    // 移動先の色を変更する
    let moveCell = document.getElementById(`cell-${e.y}-${e.x - 1}`);
    moveCell.style.backgroundColor = circleColor;
    moveCell.style.width = "2rem";
    moveCell.style.height = "2rem";
  });

  turnCount += 1;
};

export { initMap, turn, grid };
