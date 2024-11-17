import { useState } from "react";
import "./Grid.css";

export default function Grid(props) {
  // eslint-disable-next-line react/prop-types
  const { Grid, handleClick } = props;

  const [grid] = useState(Grid);

  return (
    <div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((node) => (
              <div
                key={`${rowIndex}${node}`}
                className={`grid-cell ${node.isStart ? "start" : ""} 
                ${node.isEnd ? "end" : ""} 
                ${node.isWall ? "wall" : ""} h-8 w-8`}
                onClick={() => handleClick(node.row, node.col)}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
