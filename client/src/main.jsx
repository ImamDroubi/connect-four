import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MatrixContextProvider from "./contexts/matrixContext.jsx";
import GameDataContextProvider from "./contexts/gameDataContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MatrixContextProvider>
      <GameDataContextProvider>
        <App />
      </GameDataContextProvider>
    </MatrixContextProvider>
  </React.StrictMode>
);
