const xDirections = [0, 1, 0, -1];
const yDirections = [-1, 0, 1, 0];

function search(grid, currX, currY, path, visited) {
  if (grid[currY][currX].isTarget) return true;

  // eslint-disable-next-line no-param-reassign
  visited[currY][currX] = true;
  path.push({
    x: currX,
    y: currY,
  });

  for (let i = 0; i < 4; i += 1) {
    const nextX = currX + xDirections[i];
    const nextY = currY + yDirections[i];
    if (nextY >= 0 && nextY < grid.length && nextX >= 0 && nextX < grid[nextY].length) {
      const nextNode = grid[nextY][nextX];
      if (!nextNode.isWall && !visited[nextY][nextX]) {
        if (search(grid, nextX, nextY, path, visited)) return true;
      }
    }
  }

  return false;
}

module.exports = function depthFirstSearch(grid, startX, startY) {
  const path = [];
  const visited = [];

  for (let i = 0; i < grid.length; i += 1) {
    const row = [];
    for (let j = 0; j < grid[i].length; j += 1) {
      row.push(false);
    }
    visited.push(row);
  }

  search(grid, startX, startY, path, visited);

  return path;
};
