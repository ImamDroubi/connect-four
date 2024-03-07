import { createContext, useContext, useState } from "react";
import { socket } from "../socket";

export const GameDataContext = createContext(null);

export default function GameDataContextProvider({ children }) {
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 or 2
  const [myCurrentId,setMyCurrentId]= useState(null);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [playerOneId, setPlayerOneId] = useState(null);
  const [playerTwoId, setPlayerTwoId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [myCurrentName,setMyCurrentName] = useState("Player 1");
  const [playerOneName,setPlayerOneName] = useState("Player 1");
  const [playerTwoName,setPlayerTwoName] = useState("Player 2");
  const [winner,setWinner] = useState(null);
  
  const resetGameData = (winner)=>{
    socket.emit('game-ended' , currentRoomId);
    setWinner(winner);
    setCurrentPlayer(1);
    setMyCurrentId(null);
    setCurrentRoomId(null);
    setPlayerOneId(null);
    setPlayerTwoId(null);
    setGameStarted(false);
    setMyCurrentName(null);
    setPlayerOneName(null);
    setPlayerTwoName(null);
    socket.disconnect();
    socket.connect();
  }

  return (
    <GameDataContext.Provider
      value={{
        currentPlayer,
        setCurrentPlayer,
        currentRoomId,
        setCurrentRoomId,
        playerOneId,
        setPlayerOneId,
        playerTwoId,
        setPlayerTwoId,
        gameStarted,
        setGameStarted,
        myCurrentId,
        setMyCurrentId,
        playerOneName,
        setPlayerOneName,
        playerTwoName,
        setPlayerTwoName,
        myCurrentName,
        setMyCurrentName,
        winner,
        setWinner,
        resetGameData
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
}

export function useGameData() {
  const context = useContext(GameDataContext);
  if (!context) {
    throw new Error();
  }
  return context;
}
