import { useParams } from "../../context/context";
import {
  person,
  destination,
  wall,
  energy,
  refresh,
  play,
} from "../../assets/icons";
import { getGrid } from "../../utils/startinggrid";
import "./Controlbar.css";

export default function Controlbar() {
  const { mode, setMode, setAlgo, setRes, setRun, setGrid } = useParams();

  return (
    <div className="flex justify-center bg-black">
      {/* Set start */}
      <button
        type="button"
        className={[
          "bg-blue-600 rounded m-2 p-2",
          mode === "setstart" ? "selected" : "",
        ].join(" ")}
        onClick={() => {
          console.log("Current mode:", mode);
          if (mode === "setstart") setMode(null);
          else setMode("setstart");
        }}
      >
        {person}
      </button>
      {/* Set target */}
      <button
        type="button"
        className={[
          "bg-blue-600 rounded m-2 p-2",
          mode === "settarget" ? "selected" : "",
        ].join(" ")}
        onClick={() => {
          if (mode === "settarget") setMode(null);
          else setMode("settarget");
        }}
      >
        {destination}
      </button>
      {/* Add wall */}
      <button
        type="button"
        className={[
          "bg-blue-600 rounded m-2 p-2",
          mode === "addwall" ? "selected" : "",
        ].join(" ")}
        onClick={() => {
          if (mode === "addwall") setMode(null);
          else setMode("addwall");
        }}
      >
        {wall}
      </button>
      {/* Add energy */}
      <button
        type="button"
        className={[
          "bg-blue-600 rounded m-2 p-2",
          mode === "addenergy" ? "selected" : "",
        ].join(" ")}
        onClick={() => {
          if (mode === "addenergy") setMode(null);
          else setMode("addenergy");
        }}
      >
        {energy}
      </button>
      {/* Restart */}
      <button
        type="button"
        className="bg-blue-600 rounded m-2 p-2"
        onClick={() => setRes((old) => !old)}
      >
        {refresh}
      </button>
      {/* Run */}
      <button
        type="button"
        className="bg-blue-600 rounded m-2 p-2"
        onClick={() => setRun((old) => !old)}
      >
        {play}
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
      <select
        className="rounded m-2 p-2"
        onChange={() => setGrid(getGrid(50, 25))}
      >
        <option value="custom">Custom</option>
        <option value="layout1">Layout 1</option>
        <option value="layout2">Layout 2</option>
      </select>
    </div>
  );
}
