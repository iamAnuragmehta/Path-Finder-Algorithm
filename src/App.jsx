import { useState } from "react";
import Grid from "./components/grid/Grid";

export default function App() {
  const Row = 30;
  const Col = 20;

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
        });
      }
      grid.push(currentRow);
    }
    return grid;
  }

  const [grid, setGrid] = useState(createInitialGrid(Row, Col));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  function handleClick(row, col) {
    const newGrid = grid.slice();
    const clickedNode = newGrid[row][col];

    if (clickedNode.isStart || clickedNode.isEnd) return;

    if (!start) {
      clickedNode.isStart = true;
      // bruteforce method needs to be changed
      setStart(clickedNode);
    } else if (!end && clickedNode !== start) {
      clickedNode.isEnd = true;
      // bruteforce method needs to be changed
      setEnd(clickedNode);
    } else {
      clickedNode.isWall = !clickedNode.isWall;
    }

    setGrid(newGrid);
  }

  return (
    <>
      <Grid Grid={grid} handleClick={handleClick} />
    </>
  );
}
