import Enemy from "./Enemy.js";
import { grid } from "./constant.js";
import { TURRET_TYPES } from './constant.js';
import searchPath from "./searchPath.js";
import attackableEnemies from "./attackableEnemies.js";
import Turret from "./Turret.js";

import { placeTurret } from "./strategy.js";
import { selectAttackTarget } from "./strategy.js";

// ●の色を定義します
const circleColor = "red";

//turret t1
const t1TurretColor = "orange"; 

//turret t2
const t2TurretColor = "purple"; 

const enemylist = [];
const turretlist = [];
const p = [];
let turnCount = 0;
const cHitPoint = 200;
const cMoney = 1200;
let hitPoint = cHitPoint;
let money = cMoney;

function turretValidation(type, x, y, turretlist, money) {
  // 位置が砲台を配置可能な場所であることを確認
  if (grid[y][x] !== 1  ) {
    return false;
  }
  // 既に砲台が配置されていないことを確認
  if (turretlist.some(turret => turret.x === x && turret.y === y)) {
    return false;
  }
  // 砲台の価格がプレイヤーのお金を超えていないことを確認
  if (money < TURRET_TYPES[type].price) {
    return false;
  }
  return true;
}

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
  let pTurretData = placeTurret(turnCount, money, enemylist, turretlist);
  for (let turretData of pTurretData) {
   let [type, x, y] = turretData;
   if (turretValidation(type, x, y, turretlist, money)) {
       turretlist.push(new Turret(type, x, y));
       // お金を減らす
       money -= TURRET_TYPES[type].price;
   }
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
    let turretCell = document.getElementById(`cell-${t.y}-${t.x}`);
    // 砲台の幅高さを指定
    turretCell.style.width = ` ${2}rem`;
    turretCell.style.height = ` ${2}rem`;
    // テキストを代入 
    turretCell.innerText = t.turretType;
    turretCell.style.color = "white";
    turretCell.style.backgroundColor = t.color;

    //search Enemy
    let enemiesInRange = attackableEnemies(t, enemylist);

    //select strategy
    let targetEnemies = selectAttackTarget(t, enemiesInRange);
    
    //攻撃数
    let attack_num = t.attackslots;
    
    for (let i = 0; i < Math.min(attack_num, targetEnemies.length); i++) {
      let enemy = targetEnemies[i];
      if (enemylist.indexOf(enemy)!== -1) {
        if(enemy.getDamage(t.power)){
          //報酬を入手
          money += enemy.reward;

          // 位置を取得
          let enemyCell = document.getElementById(`cell-${enemy.y}-${enemy.x - 1}`);
          // テキストを代入 
          enemyCell.innerText = "";
          enemyCell.style.color = "white";
          enemyCell.style.backgroundColor = "white";

          //enemyオブジェクトをリストから消去
          let index = enemylist.indexOf(enemy);
          enemylist.splice(index, 1);
        }
      }
    }
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
