import { grid } from "./constant.js";
import { TURRET_TYPES } from './constant.js';

function placeTurret(turn, money, enemylist, turretlist) {
    let turretsToPlace = [];

    // Turretが配置可能な場所を取得
    let puttablePos = getPuttablePos(turretlist);

    // お金があれば Turret を設置する
    let turretTypes = Object.keys(TURRET_TYPES); // "t1", "t2", ...

    for (let i = turretTypes.length - 1; i >= 0; i--) {
        let turretType = turretTypes[i];
        if (money >= TURRET_TYPES[turretType].price && puttablePos.length > 0) {
            // 乱数で設置場所を選ぶ
            let randomPosIndex = Math.floor(Math.random() * puttablePos.length);
            let [x, y] = puttablePos[randomPosIndex];

            // 乱数で砲台の種類を選ぶ
            let randomTypeIndex = Math.floor(Math.random() * turretTypes.length);
            let turretType = turretTypes[randomTypeIndex];

            turretsToPlace.push([turretType, x, y]);
            break;
        }
    }

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

function getPuttablePos(turretlist){
    let pos = [];
    for(let y = 0; y < grid.length; y++){
        for(let x = 0; x < grid[y].length; x++){
            // セルが設置可能で、かつ、既に砲台が設置されていない場所を選択
            if(grid[y][x] === 1 && !turretlist.some(turret => turret.x === x && turret.y === y)){ 
                pos.push([x, y]);
            }
        }
    }
    return pos;
}


export { placeTurret, selectAttackTarget };