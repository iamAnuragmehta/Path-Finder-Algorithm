import { useState } from "react";
import { MAX_ROWS, MAX_COLS } from "./utils/constants";
import Grid from "./components/grid/Grid";
import Controlbar from "./components/controlbar/Controlbar";
import { dijkstra } from "./algorithm/dijkstra";
import { bellmanFord } from "./algorithm/bellman-ford";

export default function App() {
  const [startTile] = useState({ row: 1, col: 1 });
  const [endTile] = useState({ row: MAX_ROWS - 2, col: MAX_COLS - 2 });

  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [mode, setMode] = useState("addwall");
  const [algo, setAlgo] = useState("dijkstra");
  const [res, setRes] = useState(false);
  const [run, setRun] = useState(false);
  const [grid, setGrid] = useState(createInitialGrid(MAX_ROWS, MAX_COLS));

  function createInitialGrid(RowNum, ColNum) {
    const grid = [];
    for (let row = 0; row < RowNum; row++) {
      const currentRow = [];
      for (let col = 0; col < ColNum; col++) {
        currentRow.push({
          row,
          col,
          isStart: false,
          isEnd: false,
          isWall: false,
          isEnergy: false,
          distance: Infinity,
          isPath: false,
          isTraversed: false,
          parent: null,
        });
      }
      grid.push(currentRow);
    }
    return grid;
  }

  function handleClick(row, col) {
    const newGrid = grid.slice();
    const clickedNode = newGrid[row][col];

    switch (mode) {
      case "setstart":
        if (!start) {
          clickedNode.isStart = true;
          startTile.row = clickedNode.row;
          startTile.col = clickedNode.col;
          console.log(startTile);
          setStart(true);
        } else if (start && clickedNode.isStart === true) {
          clickedNode.isStart = false;
          startTile.row = null;
          startTile.col = null;
          console.log(startTile);
          setStart(false);
        } else {
          alert("Source node is alredy placed");
        }
        setMode("addwall");
        break;

      case "setend":
        if (!end) {
          clickedNode.isEnd = true;
          endTile.row = clickedNode.row;
          endTile.col = clickedNode.col;
          console.log(startTile);
          setEnd(true);
          console.log("end added");
        } else if (end && clickedNode.isEnd === end) {
          clickedNode.isEnd = false;
          endTile.row = null;
          endTile.col = null;
          setEnd(false);
          console.log("End removed");
        } else {
          alert("End node is alredy placed");
        }
        setMode("addwall");
        break;

      case "addwall":
        if (clickedNode.isEnergy) {
          return;
        } else if (!clickedNode.isWall) {
          clickedNode.isWall = !clickedNode.isWall;
          console.log("added wall");
        }
        break;

      case "addenergy":
        if (clickedNode.isWall) {
          return;
        } else if (!clickedNode.isEnergy) {
          clickedNode.isEnergy = !clickedNode.isEnergy;
        }
        break;

      default:
        break;
    }

    setGrid(newGrid);
  }

  function clearboard(grid) {
    console.log("hi");
    const newGrid = grid.slice();
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const tile = newGrid[row][col];
        tile.isStart = false;
        tile.isEnd = false;
        tile.isWall = false;
        tile.isEnergy = false;
        tile.distance = Infinity;
        tile.isPath = false;
        tile.isTraversed = false;
        const tile2 = document.getElementById(`${tile.row}-${tile.col}`);
        tile2.classList.remove("traversed");
        tile2.classList.remove("path");
      }
    }
    setStart(false);
    setEnd(false);
    setGrid(newGrid);
  }

  function reset(grid) {
    console.log("hi");
    const newGrid = grid.slice();
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const tile = grid[row][col];
        tile.distance = Infinity;
        tile.isPath = false;
        tile.isTraversed = false;
        const tile2 = document.getElementById(`${tile.row}-${tile.col}`);
        tile2.classList.remove("traversed");
        tile2.classList.remove("path");
      }
    }
    setGrid(newGrid);
  }

  function Visualize(algo) {
    const newGrid = grid.slice();
    console.log(startTile);
    if (algo === "dijkstra") {
      let { traversedTiles, path } = dijkstra(newGrid, startTile, endTile);
      animatePath(traversedTiles, path, startTile, endTile);
      console.log(traversedTiles);
      console.log(path);
    } else if (algo === "bellman-ford") {
      return;
    }

    setGrid(newGrid);
  }

  function animatePath(traversedTiles, path, startTile, endTile) {
    for (let i = 0; i < traversedTiles.length; i++) {
      setTimeout(() => {
        const currentTile = traversedTiles[i];
        if (
          !(
            currentTile.row === startTile.row &&
            currentTile.col === startTile.col
          ) &&
          !(currentTile.row === endTile.row && currentTile.col === endTile.col)
        ) {
          document
            .getElementById(`${currentTile.row}-${currentTile.col}`)
            .classList.add("traversed");
        }
      }, 30 * i);
    }

    for (let i = 0; i < path.length; i++) {
      setTimeout(() => {
        const currentTile = path[i];
        if (
          !(
            currentTile.row === startTile.row &&
            currentTile.col === startTile.col
          ) &&
          !(currentTile.row === endTile.row && currentTile.col === endTile.col)
        ) {
          const tile = document.getElementById(
            `${currentTile.row}-${currentTile.col}`
          );
          tile.classList.remove("traversed");
          tile.classList.add("path");
        }
      }, 30 * traversedTiles.length + 75 * i);
    }

    setTimeout(
      () => setRun(false),
      30 * traversedTiles.length + 75 * path.length
    );
  }

  return (
    <div>
      <Controlbar
        grid={grid}
        mode={mode}
        setMode={setMode}
        algo={algo}
        setAlgo={setAlgo}
        setRes={setRes}
        setRun={setRun}
        setGrid={setGrid}
        reset={reset}
        clearboard={clearboard}
        Visualize={Visualize}
      />
      <Grid grid={grid} run={run} handleClick={handleClick} />
    </div>
  );
}
