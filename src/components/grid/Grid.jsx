/* eslint-disable react/prop-types */
import "./Grid.css";

export default function Grid(props) {
  const { grid, handleClick } = props;

  return (
    <div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((node, nodeIndex) => (
              <div
                key={`${rowIndex}${nodeIndex}`}
                className={`grid-cell ${node.isStart ? "start" : ""} 
                ${node.isEnd ? "end" : ""} 
                ${node.isWall ? "wall" : ""}
                ${node.isEnergy ? "energy" : ""}
                ${node.isPath ? "path" : ""} h-8 w-8`}
                onClick={() => handleClick(node.row, node.col)}
                onMouseDown={() => {}} // start wall edit mode
                onMouseMove={() => {}} // add or remove wall
                onMouseUp={() => {}} // end wall edit mode
              >{`${rowIndex}-${nodeIndex}`}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
