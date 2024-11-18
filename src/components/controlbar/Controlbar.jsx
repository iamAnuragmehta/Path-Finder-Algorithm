import {
  person,
  destination,
  wall,
  energy,
  refresh,
  play,
} from "../../assets/icons";
import "./Controlbar.css";

export default function Controlbar(props) {
  // eslint-disable-next-line react/prop-types
  const { mode, setMode, algo, setAlgo, setRun, setGrid, reset, Visualize } =
    props;

  return (
    <div className="sidebar flex flex-col h-full w-14 fixed top-0 right-0 overflow-hidden bg-gray-900">
      {/* Set start */}
      <button
        type="button"
        className={[
          "flex flex-row bg-green-600 rounded m-2 p-2",
          mode === "setstart" ? "selected" : "",
        ].join(" ")}
        onClick={() => {
          if (mode === "setstart") setMode("addwall");
          else setMode("setstart");
        }}
      >
        <i className="mr-4">{person}</i> <p>Add Source Node</p>
      </button>
      {/* Set target */}
      <button
        type="button"
        className={[
          "flex flex-row bg-red-600 rounded m-2 p-2",
          mode === "setend" ? "selected" : "",
        ].join(" ")}
        onClick={() => {
          if (mode === "setend") setMode("addwall");
          else setMode("setend");
        }}
      >
        <i className="mr-4">{destination}</i> <p>Add Destination Node</p>
      </button>
      {/* Add wall */}
      <button
        type="button"
        className={[
          "flex flex-row bg-black rounded m-2 p-2 text-white",
          mode === "addwall" ? "selected" : "",
        ].join(" ")}
        onClick={() => {
          if (mode === "addwall") setMode("addwall");
          else setMode("addwall");
        }}
      >
        <i className="mr-4">{wall}</i> <p>Wall</p>
      </button>
      {/* Add energy */}
      {algo === "dijkstra" ? null : (
        <button
          type="button"
          className={[
            "flex flex-row bg-yellow-600 rounded m-2 p-2",
            mode === "addenergy" ? "selected" : "",
          ].join(" ")}
          onClick={() => {
            if (mode === "addenergy") setMode("addwall");
            else setMode("addenergy");
          }}
        >
          <i className="mr-4">{energy}</i> <p>Add negative weight</p>
        </button>
      )}

      {/* Reset */}
      <button
        type="button"
        className=" flex flex-row bg-blue-600 rounded m-2 p-2"
        onClick={() => {
          reset();
        }}
      >
        <i className="mr-4">{refresh}</i> <p>Reset</p>
      </button>
      {/* Run */}
      <button
        type="button"
        className=" flex flex-row bg-blue-600 rounded m-2 p-2"
        onClick={() => {
          setRun(true);
          Visualize(algo);
        }}
      >
        <i className="mr-4">{play}</i> <p>Visualize</p>
      </button>
      {/* Choose algorithm */}
      <select
        className="rounded m-2 p-2"
        onChange={(e) => setAlgo(e.target.value)}
      >
        <option value="dijkstra">Dijkstra algorithm</option>
        <option value="bellman-ford">Bellman-Ford algorithm</option>
      </select>
      {/* Layout */}
      <select className="rounded m-2 p-2" onChange={() => setGrid()}>
        <option value="custom">Custom</option>
        <option value="layout1">Layout 1</option>
        <option value="layout2">Layout 2</option>
      </select>
    </div>
  );
}
