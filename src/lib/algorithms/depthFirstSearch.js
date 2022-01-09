// up, right, down, left
const xDirections = [0, 1, 0, -1];
const yDirections = [-1, 0, 1, 0];

function search(grid, currX, currY, path, shortestPath, visited) {
  // eslint-disable-next-line no-param-reassign
  visited[currY][currX] = true;

  path.push({
    x: currX,
    y: currY,
  });

  if (grid[currY][currX].isTarget) {
    shortestPath.push({
      x: currX,
      y: currY,
    });
    return true;
  }

  for (let i = 0; i < 4; i += 1) {
    const nextX = currX + xDirections[i];
    const nextY = currY + yDirections[i];
    if (nextY >= 0 && nextY < grid.length && nextX >= 0 && nextX < grid[nextY].length) {
      const nextNode = grid[nextY][nextX];
      if (!nextNode.isWall && !visited[nextY][nextX]) {
        if (search(grid, nextX, nextY, path, shortestPath, visited)) {
          shortestPath.push({
            x: currX,
            y: currY,
          });
          return true;
        }
      }
    }
  }

  return false;
}

function reverseArray(arr) {
  const reversedArray = [];

  for (let i = arr.length - 1; i >= 0; i -= 1) {
    reversedArray.push(arr[i]);
  }

  return reversedArray;
}

// 1 2 3 4 5 6 7 8 9 10
module.exports = function depthFirstSearch(grid, startX, startY) {
  const shortestPath = [];
  const path = [];
  const visited = [];

  for (let i = 0; i < grid.length; i += 1) {
    const row = [];
    for (let j = 0; j < grid[i].length; j += 1) {
      row.push(false);
    }
    visited.push(row);
  }

  search(grid, startX, startY, path, shortestPath, visited);

  return {
    visitInOrder: path,
    shortestPath: reverseArray(shortestPath),
  };
};
