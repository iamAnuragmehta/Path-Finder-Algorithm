import { useParams } from "./context/context";
import Controlbar from "./components/controlbar/Controlbar";
import Grid from "./components/grid/Grid";

export default function App() {
  console.log(useParams());
  return (
    <>
      <Controlbar />
      <Grid />
    </>
  );
}
