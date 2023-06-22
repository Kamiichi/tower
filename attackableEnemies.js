import Enemy from "./Enemy.js";
import Turret from "./Turret.js";

function attackableEnemies(turret, enemylist) {
    let attackRange = turret.range;
    let pos = [turret.x, turret.y];

    // 射程範囲内の敵をフィルタリング
    let enemiesInRange = enemylist.filter(enemy => {
        let distance = Math.max(Math.abs(pos[0] - enemy.x + 1), Math.abs(pos[1] - enemy.y ));
        return distance <= attackRange;
    });
    return enemiesInRange;
}

export default attackableEnemies;