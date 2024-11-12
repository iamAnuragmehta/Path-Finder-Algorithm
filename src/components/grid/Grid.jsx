import { useState, useRef } from "react";
import { useParams } from "../../context/context";
import { person, destination } from "../../assets/icons";
import "./Grid.css";

export default function Grid() {
  const { grid } = useParams();

  const [refarray] = useState(getrefarray(grid));

  function getrefarray(grid) {
    let array = [];
    grid.forEach((elem) => {
      elem.forEach(() => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        array.push(useRef());
      });
    });
    return array;
  }
  return (
    <div className="w-full h-full">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
          gap: "0px",
          aspectRatio: `${grid[0].length} / ${grid.length}`,
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              ref={refarray[i * grid[0].length + j]}
              className={[
                "aspect-square border border-gray-300 flex items-center justify-center relative",
                cell.iswall ? "bg-gray-800" : "",
                cell.isstart ? "bg-green-500" : "",
                cell.istarget ? "bg-red-500" : "",
                cell.weight > 1 ? "bg-yellow-500" : "",
              ].join(" ")}
            >
              {cell.isstart && (
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  {person}
                </svg>
              )}
              {cell.istarget && (
                <svg className="w-full h-full" viewBox="0 0 24 24">
                  {destination}
                </svg>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
