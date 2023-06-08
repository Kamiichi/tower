function searchPath(map) {
  // マップのサイズを取得
  const mapWidth = map[0].length-1;
  const mapHeight = map.length;

  // スタート位置の特定
  let start_y = 0;
  for (let i = 0; i < map.length; i++) {
    if (map[i][mapWidth - 1] === 0) {
      start_y = i;
      break;
    }
  }
  // ゴール位置の特定
  let goal_y = 0;
  for (let i = 0; i < map.length; i++) {
    if (map[i][0] === 0) {
      goal_y = i;
      break;
    }
  }

  // スタート位置とゴール位置の座標を取得
  const startX = mapWidth;
  const startY = start_y;
  const goalX = 0;
  const goalY = goal_y;

  // オープンリストとクローズドリストを初期化
  const openList = [{ x: startX, y: startY, parent: null }];
  const closedList = [];

  // 移動可能な4方向を定義
  const directions = [
    { dx: 0, dy: -1 }, // 上
    { dx: 0, dy: 1 }, // 下
    { dx: -1, dy: 0 }, // 左
    { dx: 1, dy: 0 }, // 右
  ];

  // ゴールに到達するまで繰り返す
  while (openList.length > 0) {
    // オープンリストから最もコストの低いノードを取得
    const currentNode = openList.shift();

    // ゴールに到達した場合、パスを構築して返す
    if (currentNode.x === goalX && currentNode.y === goalY) {
      const path = [];
      let node = currentNode;
      while (node !== null) {
        path.unshift([node.x, node.y]);
        node = node.parent;
      }
      return path;
    }

    // クローズドリストに追加
    closedList.push(currentNode);

    // 各方向に移動を試みる
    for (const direction of directions) {
      const newX = currentNode.x + direction.dx;
      const newY = currentNode.y + direction.dy;

  // 移動可能な4方向を定義
  const directions = [
      { dx: 0, dy: -1 },  // 上
      { dx: 0, dy: 1 },   // 下
      { dx: -1, dy: 0 },  // 左
      { dx: 1, dy: 0 }    // 右
  ];

  // ゴールに到達するまで繰り返す
  while (openList.length > 0) {
      // オープンリストから最もコストの低いノードを取得
      const currentNode = openList.shift();

      // ゴールに到達した場合、パスを構築して返す
      if (currentNode.x === goalX && currentNode.y === goalY) {
          const path = [];
          let node = currentNode;
          while (node !== null) {
              path.unshift([node.x, node.y]);
              node = node.parent;
          }
          return path;
      }

      // クローズドリストに追加
      closedList.push(currentNode);
      
      // 各方向に移動を試みる
      for (const direction of directions) {
        const newX = currentNode.x + direction.dx;
        const newY = currentNode.y + direction.dy;

        // 移動先がマップ範囲内であり、通行可能かつクローズドリストに含まれていない場合
        if (
            newX >= 0 && newX < mapWidth &&
            newY >= 0 && newY < mapHeight &&
            map[newY][newX] === 0 &&
            !closedList.some(node => node.x === newX && node.y === newY)
        ) {
            // 移動先のノードを生成し、オープンリストに追加
            const newNode = { x: newX, y: newY, parent: currentNode };
            openList.push(newNode);
        }
      }
    }
  }
  // ゴールに到達できなかった場合、パスは存在しない
  return null;
}

path = searchPath(map);
console.log(path);
