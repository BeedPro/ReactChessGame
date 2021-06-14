import "./App.css";
import "./components/Chessboard/Chessboard";
import Chessboard from "./components/Chessboard/Chessboard";

export default function App() {
  return (
    <div id="app">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white"
        }}
      >
        Chess
      </h1>
      <Chessboard />
    </div>
  );
}
