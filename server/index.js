const PORT = 8000;
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

let currentQueue = [];
let currentGames = [];
io.on("connection", (socket) => {
  console.log(`a user connected : ${socket.id}`);
  socket.emit("id-generated", socket.id);

  socket.on('disconnect', ()=>{
    currentQueue = currentQueue.filter((player)=>player.playerId !== socket.id); 
  })

  socket.on("enter-random-room", (playerId ,playerName) => {
    const playerOne = currentQueue.find(player=>player.friend == undefined); 

    if (!playerOne) {
      currentQueue.push({playerId:playerId, playerName : playerName});
    } else {
      currentQueue = currentQueue.filter(player => player.playerId !== playerOne.playerId);
      const playerOneId = playerOne.playerId ;
      const playerOneName = playerOne.playerName;
      
      const playerTwoId = playerId;
      const playerTwoName = playerName;
      socket.join(playerOneId);
      const currentPlayer = 1;
      const currentRoomId = playerOneId;
      const gameStarted = true;
      const gameData = {
        playerOneId,
        playerOneName,
        playerTwoId,
        playerTwoName,
        currentPlayer,
        currentRoomId,
        gameStarted,
      };
      currentGames.push(gameData);
      io.to(currentRoomId).emit("game-started", gameData);
    }
  });

  socket.on("enter-friend-room" , (friendId, playerId, playerName) => { 
    let friend = currentQueue.find((player)=>player.playerId == friendId);
    if(!friend){
      const player = {
        playerId : playerId, 
        playerName : playerName,
        friend  :true
      }
      currentQueue.push(player);
    }else{
      currentQueue = currentQueue.filter((player)=>player.playerId !== friendId);
      const playerOneId = friend.playerId ;
      const playerOneName = friend.playerName;

      const playerTwoId = playerId;
      const playerTwoName = playerName;
      socket.join(playerOneId);
      const currentPlayer = 1;
      const currentRoomId = playerOneId;
      const gameStarted = true;
      const gameData = {
        playerOneId,
        playerOneName,
        playerTwoId,
        playerTwoName,
        currentPlayer,
        currentRoomId,
        gameStarted,
      };
      currentGames.push(gameData);
      io.to(currentRoomId).emit("game-started", gameData);
    }
  })

  socket.on('action-performed', (cellRow, cellColumn)=>{
    const actionPerformer = socket.id; 
    let game = currentGames.find(game=>{
      return game.playerOneId === actionPerformer || game.playerTwoId === actionPerformer ;
    });
    game.currentPlayer = 1 ;
    if(actionPerformer === game.playerOneId)game.currentPlayer = 2 ;
    const actionPerformerNumber = game.currentPlayer === 1? 2 : 1 ;
    currentGames = currentGames.filter((gameData)=> gameData.currentRoomId !== game.currentRoomId );
    currentGames.push(game);
    io.to(game.currentRoomId).emit('action-performed' , cellRow , cellColumn, actionPerformerNumber);
  })
  socket.on('game-ended' , (roomId)=>{
    currentGames = currentGames.filter(game=>game.currentRoomId !== roomId);
  })
});  

app.get("/", (req, res) => {
  res.status(200).json("Hello");
});

server.listen(PORT, () => {
  console.log("Connected Successfully!");
});
