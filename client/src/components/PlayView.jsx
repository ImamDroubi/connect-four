import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { useGameData } from "../contexts/gameDataContext";
import { CircularProgress } from "@mui/material";
import { useMatrix } from "../contexts/matrixContext";
import { socket } from "../socket";



export default function PlayView() {
  const {
    currentPlayer,
    setCurrentPlayer,
    currentRoomId,
    myCurrentId,
    playerOneId,
    playerTwoId,
    playerOneName,
    playerTwoName,
    resetGameData
  } = useGameData();
  const { matrix, setMatrix, resetMatrix } = useMatrix();
  const [grid, setGrid] = useState([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);
  const [winningState,setWinningState] = useState(-1);

  const checkClickable = (row, col) => {
    if (
      (currentPlayer === 1 && myCurrentId !== playerOneId) ||
      (currentPlayer === 2 && myCurrentId !== playerTwoId)
    )
      return false;
    if (grid[row][col] != 0) return false;
    if (row == 5 || grid[row + 1][col] != 0) return true;
    return false;
  };

  const checkWinningState = (grid)=>{
    if(grid === undefined || grid == null)return -1 ;
    // right diagonal 
    for(let i =0; i<3; i++){
      for(let j = 0 ; j<4; j++){
        if(grid[i][j] !== 0){
          const c = grid[i][j] ;
          if(grid[i+1][j+1] === c && grid[i+2][j+2] === c && grid [i+3][j+3] === c) return c; 
        }
      }
    }
    // left diagonal
    for(let i =0; i<3; i++){
      for(let j = 3 ; j<7; j++){
        if(grid[i][j] !== 0){
          const c = grid[i][j] ;
          if(grid[i+1][j-1] === c && grid[i+2][j-2] === c && grid [i+3][j-3] === c) return c; 
        }
      }
    }
    // horizantal 
    for(let i = 0; i<6; i++){
      for(let j= 0 ;j<4; j++){
        if(grid[i][j] !== 0){
          const c = grid[i][j] ;
          if(grid[i][j+1] === c && grid[i][j+2] === c && grid[i][j+3] === c) return c ;
        }
      }
    }
    // vertical 
    console.log("reached");
    for(let i = 0; i<3; i++){
      for(let j= 0 ;j<7; j++){
        if(grid[i][j] !== 0){
          console.log("ttt");
          const c = grid[i][j] ;
          if(grid[i+1][j] === c && grid[i+2][j] === c && grid[i+3][j] === c) return c ;
        }
      }
    }
    return -1 ;
  }

  useEffect(() => {
    setGrid(matrix);
  }, matrix);

  useEffect(()=>{
    if(winningState != -1 ){
      resetMatrix();
      resetGameData(winningState == 1 ? (playerOneName??"player 1") : (playerTwoName??"player 2"));
    }
  },[winningState]);

  useEffect(() => {
    socket.on("action-performed", (row, col, number) => {
      let mat = matrix;
      mat[row][col] = number;
      setMatrix(mat);
      setCurrentPlayer(number === 1 ? 2 : 1);
      // ============================= This is to check Winning ======================================
      setWinningState(checkWinningState(mat));
    });

    return () => {
      socket.off("action-performed", (row, col, number) => {
        let mat = matrix;
        mat[row][col] = number;
        setMatrix(mat);
        setCurrentPlayer(number === 1 ? 2 : 1);
        setWinningState(checkWinningState(mat));
      });
    };
  }, []);


  if (!currentPlayer) return <CircularProgress />;
  return (
    <>
      <div className="info flex w-full justify-between px-2 text-gray-100 text-lg ">
        <div className="player-1">
          <h3
            className={`${
              currentPlayer == 1 ? "text-primary-400 underline text-xl" : ""
            }`}
          >
            {playerOneName || "Player 1"}
          </h3>
        </div>
        <div>
          <p>{`Room ID: ${currentRoomId}`}</p>
        </div>
        <div className="player-2">
          <h3
            className={`${
              currentPlayer == 2 ? "text-primary-400 underline text-xl" : ""
            }`}
          >
            {playerTwoName || "Player 2"}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-7 grid-rows-6 gap-[0px] mt-2 w-full aspect-[7/6]">
        {grid.map((item, i) => {
          return item.map((cell, j) => {
            const cellNumber = i * 7 + j;
            return (
              <Cell
                row={i}
                col={j}
                number={cell}
                clickable={checkClickable(i, j)}
                key={cellNumber}
              />
            );
          });
        })}
      </div>
    </>
  );
}
