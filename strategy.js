import { grid } from "./constant.js";
import { TURRET_TYPES } from './constant.js';

import Turret from "./Turret.js";

function placeTurret(turn, money, enemylist, turretlist) {
    let turretsToPlace = [];

    // Turretが配置可能な場所を取得
    let puttablePos = getPuttablePos();

    // Turretがすでに設置されている位置を除く
    let freePos = puttablePos.filter(pos => {
        console.log("POS      position: ", pos);
        //console.log("TURRET      position: ", [turret.x, turret.y]);
        return !turretlist.some(turret => turret.x === pos[0] && turret.y === pos[1]);
    });

    // お金があれば Turret を設置する
    if (money >= TURRET_TYPES["t1"].price && freePos.length > 0) {
        // 乱数で設置場所を選ぶ
        let randomIndex = Math.floor(Math.random() * freePos.length);
        let [x, y] = freePos[randomIndex];
        turretsToPlace.push(["t1",x,y]);
    }

    // freePos.forEach((t, index) => {
        // console.log(`${index}: X - ${t[0]}, Y - ${t[1]}`);
    // });


    return turretsToPlace;
}

function selectAttackTarget(t, enemiesInRange) {
    let attackNum = t.attackslots;
    let targets = [];

    // 砲台が攻撃可能な数だけランダムに敵を選ぶ
    while (attackNum > 0 && enemiesInRange.length > 0) {
        let randomIndex = Math.floor(Math.random() * enemiesInRange.length);
        let selectedEnemy = enemiesInRange.splice(randomIndex, 1)[0];
        targets.push(selectedEnemy);
        attackNum--;
    }

    return targets;
}

function getPuttablePos(){
    let pos = [];
    for(let y = 0; y < grid.length; y++){
        for(let x = 0; x < grid[y].length; x++){
            if(grid[y][x] === 1){ 
                pos.push([x, y]);
            }
        }
    }
    return pos;
}


export default placeTurret;