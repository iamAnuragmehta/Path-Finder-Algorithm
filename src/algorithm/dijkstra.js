import { MAX_ROWS, MAX_COLS } from "../utils/constants";

export const dijkstra = (grid, start, end) => {
    // Maintains two sets: visited and unvisited nodes
    // Keeps track of tentative distances to each node
    // Repeatedly selects the unvisited node with smallest tentative distance

    /**
        Algorithm:
        1. Initialize:
            - Set distance to starting node = 0
            - Set distance to all other nodes = infinity
            - Add all nodes to unvisited set
    
        2. While unvisited nodes exist:
            - Select unvisited node with smallest distance (call it current)
            - Mark current as visited
            - Update distances to all unvisited neighbors:
              new_distance = current_distance + edge_weight
              if new_distance < neighbor_distance:
              update neighbor_distance = new_distance
    */
    const traversedTiles = [];
    const base = grid[start.row][start.col];
    base.distance = 0;
    base.isTraversed = true;
    const untraverseTiles = [base];

    while (untraverseTiles.length > 0) {
        untraverseTiles.sort((a, b) => a.distance - b.distance);
        const currentTile = untraverseTiles.shift(); // remove the first element from list
        if (currentTile) {
            if (currentTile.isWall) continue;
            if (currentTile.distance === Infinity) break;
            currentTile.isTraversed = true;
            traversedTiles.push(currentTile);
            if (currentTile.row === end.row && currentTile.col === end.col) break; // end tile found
            const neighbors = getNeighbour(grid, currentTile.row, currentTile.col);
            for (let i = 0; i < neighbors.length; i++) {
                if (currentTile.distance + 1 < neighbors[i].distance) {
                    dropFromQueue(neighbors[i], untraverseTiles);
                    neighbors[i].distance = currentTile.distance + 1;
                    neighbors[i].parent = currentTile;
                    untraverseTiles.push(neighbors[i])
                }
            }
        }
    }

    const path = [];
    let current = grid[end.row][end.col];
    while (current !== null) {
        current.isPath = true;
        current.isTraversed = false;
        if (current.isStart === true) { current.isPath = false }
        if (current.isEnd === true) { current.isPath = false }
        path.unshift(current);
        current = current.parent;
    }

    return { traversedTiles, path }
}

const getNeighbour = (grid, row, col) => {
    const neighbors = [];

    if (row > 0) {
        neighbors.push(grid[row - 1][col]); // push the below tile
    }
    if (row < MAX_ROWS - 1) {
        neighbors.push(grid[row + 1][col]); // pust the above tile
    }
    if (col > 0) {
        neighbors.push(grid[row][col - 1]); // pust the left tile
    }
    if (col < MAX_COLS - 1) {
        neighbors.push(grid[row][col + 1]); // pust the right tile
    }

    return neighbors.filter((neighbors) => !neighbors.isTraversed);
}

const dropFromQueue = (tile, queue) => {
    for (let i = 0; i < queue.length; i++) {
        if (tile == queue[i])
            queue.splice(i, 1);
        break;
    }
}