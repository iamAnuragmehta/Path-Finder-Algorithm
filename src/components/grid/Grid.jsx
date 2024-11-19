/* eslint-disable react/prop-types */
import "./Grid.css";

export default function Grid(props) {
  const { grid, run, handleClick } = props;

  return (
    <div className="flex mt-28 sm:mt-0 sm:ml-20 sm:mr-52 justify-center p-8">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((node, nodeIndex) => (
              <div
                key={`${rowIndex}-${nodeIndex}`}
                id={`${rowIndex}-${nodeIndex}`}
                className={`grid-cell ${node.isStart ? "start" : ""} 
                ${node.isEnd ? "end" : ""} 
                ${node.isWall ? "wall" : ""}
                ${node.isEnergy ? "energy" : ""}`}
                onClick={() => {
                  if (!run) {
                    handleClick(node.row, node.col);
                  }
                }}
                // for adding walls by click and drag
                onMouseDown={() => {}} // start wall edit mode
                onMouseMove={() => {}} // add or remove wall
                onMouseUp={() => {}} // end wall edit mode
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
