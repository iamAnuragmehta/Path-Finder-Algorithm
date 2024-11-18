import { useState } from "react";
import { MAX_ROWS, MAX_COLS } from "./utils/constants";
import Grid from "./components/grid/Grid";
import Controlbar from "./components/controlbar/Controlbar";
import { dijkstra } from "./algorithm/dijkstra";

export default function App() {
  const [startTile] = useState({ row: 1, col: 1 });
  const [endTile] = useState({ row: MAX_ROWS - 2, col: MAX_COLS - 2 });

  // mode, setMode, setAlgo, setRes, setRun, setGrid
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
          isTraversed: false,
          parent: null,
          isPath: false,
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

  function reset() {
    // temp => new grid; future => clear path
    const newGrid = createInitialGrid(MAX_ROWS, MAX_COLS).slice();
    setStart(false);
    setEnd(false);
    setGrid(newGrid);
  }

  function Visualize(algo) {
    const newGrid = grid.slice();
    console.log(startTile);
    if (algo === "dijkstra") {
      dijkstra(newGrid, startTile, endTile);
    } else if (algo === "bellman-ford") {
      return;
    }

    setGrid(newGrid);
    setRun(false);
  }

  return (
    <div className="grid grid-flow-col">
      <Controlbar
        mode={mode}
        setMode={setMode}
        algo={algo}
        setAlgo={setAlgo}
        setRes={setRes}
        setRun={setRun}
        setGrid={setGrid}
        reset={reset}
        Visualize={Visualize}
      />
      <Grid grid={grid} handleClick={handleClick} />
    </div>
  );
}
