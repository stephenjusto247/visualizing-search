// up, right, down, left
const xDirections = [0, 1, 0, -1];
const yDirections = [-1, 0, 1, 0];
let targetPos = null;

function search(grid, startX, startY, path) {
  const queue = [];
  const parentNode = [];

  for (let i = 0; i < grid.length; i += 1) {
    const row = [];
    for (let j = 0; j < grid[i].length; j += 1) {
      row.push(false);
    }
    parentNode.push(row);
  }

  queue.push({ x: startX, y: startY });
  parentNode[startY][startX] = true;

  while (queue.length > 0) {
    const currPos = queue.shift();
    const { x, y } = currPos;
    path.push(currPos);
    if (grid[y][x].isTarget) {
      targetPos = { x, y };
      return parentNode;
    }

    for (let i = 0; i < 4; i += 1) {
      const nextX = x + xDirections[i];
      const nextY = y + yDirections[i];
      if (nextY >= 0 && nextY < grid.length && nextX >= 0 && nextX < grid[nextY].length) {
        const nextNode = grid[nextY][nextX];
        if (!nextNode.isWall && !parentNode[nextY][nextX]) {
          // eslint-disable-next-line no-param-reassign
          parentNode[nextY][nextX] = currPos;
          queue.push({ x: nextX, y: nextY });
        }
      }
    }
  }

  return parentNode;
}

function reverseArray(arr) {
  const reversedArray = [];

  for (let i = arr.length - 1; i >= 0; i -= 1) {
    reversedArray.push(arr[i]);
  }

  return reversedArray;
}

function reconstructPath(parentNode) {
  const shortestPath = [];

  let currPos = targetPos;
  while (currPos) {
    const currRow = parentNode[currPos.y];
    if (currRow) currPos = currRow[currPos.x];
    else currPos = null;
    shortestPath.push(currPos);
  }

  return reverseArray(shortestPath);
}

module.exports = function breadthFirstSearch(grid, startX, startY) {
  const path = [];
  let shortestPath = [];

  const parentNode = search(grid, startX, startY, path);
  if (targetPos) shortestPath = reconstructPath(parentNode);

  return {
    visitInOrder: path,
    shortestPath,
  };
};
