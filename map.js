import Enemy from "./Enemy.js";
import { grid } from "./constant.js";
import searchPath from "./searchPath.js";
import Turret from "./Turret.js";

// ●の色を定義します
const circleColor = "red";

//turret normal
const normalTurretColor = "orange"; 

const enemylist = [];
const turretlist = [];
const p = [];
let turnCount = 0;
const cHitPoint = 200;
let hitPoint = cHitPoint;

function initMap() {
  const cellSize = (window.innerWidth * 0.7) / 20;
  document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);

  //search Pathを実行
  let path = searchPath();
  path.forEach((pp) => {
    p.push(pp);
  });

  _dispHpAndTurn();

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
  //砲台の作成
  if (turnCount === 1) {
    turretlist.push(new Turret("normal",6,6));
  }
  if (Math.random() * 100 <= 10) {
    enemylist.push(new Enemy());
  }

  // Enemy Process
  for (let i = 0; i < enemylist.length; i++) {
    let e = enemylist[i];
    // 現在位置を取得
    let lastCell = document.getElementById(`cell-${e.y}-${e.x - 1}`);
    // 現在位置を白に戻す
    lastCell.style.backgroundColor = "white";
    lastCell.innerText = "";
    // move関数実行
    e.move();

    // 仮置きダメージ判定
    if (e.getDamage(1)) {
      enemylist.splice(i, 1);
      continue;
    }

    // ダメージ
    if (e.turn !== 1 && e.x - 1 === p[0][0] && e.y === p[0][1]) {
      hitPoint -= 1;
      _dispHpAndTurn();
      // ゲームオーバー
      if (hitPoint === 0) {
        lastCell.style.backgroundColor = "red";
        return false;
      }
    }

    // 移動先の色を変更する
    let moveCell = document.getElementById(`cell-${e.y}-${e.x - 1}`);
    // 重複判定のやり方は要検討
    if (moveCell.style.backgroundColor === circleColor) {
      moveCell.style.backgroundColor = "green";
      moveCell.style.width = ` ${2}rem`;
      moveCell.style.height = ` ${2}rem`;
    } else {
      moveCell.style.backgroundColor = circleColor;
    }
    // 敵の表示をそれっぽくする
    moveCell.style.width = ` ${2}rem`;
    moveCell.style.height = ` ${2}rem`;
    // moveCell.style.marginRight = `${Math.random() - 0.5}rem`;
    // moveCell.style.marginTop = `${Math.random() - 0.5}rem`;
    moveCell.innerText = e.hp;
    moveCell.style.color = "white";
  }

  //Turret Process
  //砲台の処理
  for (let i = 0; i < turretlist.length; i++) {
    let t = turretlist[i];
    
    // 位置を取得
    let turretCell = document.getElementById(`cell-${t.y}-${t.x - 1}`);
    // 砲台の幅高さを指定
    turretCell.style.width = ` ${2}rem`;
    turretCell.style.height = ` ${2}rem`;
    // テキストを代入 
    turretCell.innerText = t.turretType;
    turretCell.style.color = "white";
    turretCell.style.backgroundColor = normalTurretColor;

    //search Enemy
    
  }

  // ターンカウント増加
  turnCount += 1;
  const turnText = document.getElementById("turn");
  turnText.textContent = turnCount;
  // ターン継続
  return true;
};

const _dispHpAndTurn = () => {
  // HPテキスト
  const hpText = document.getElementById("hitPoint");
  hpText.textContent = hitPoint;
  // HPバー
  const hpBar = document.getElementById("hpBar");
  hpBar.style = `width: ${(hitPoint / cHitPoint) * 100}%`;
  if ((hitPoint / cHitPoint) * 100 < 10) {
    hpBar.style.backgroundColor = "red";
  }
};

export { initMap, turn, grid, hitPoint };
