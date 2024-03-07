import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, TextField } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useGameData } from "../contexts/gameDataContext";
import { socket } from "../socket";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SecondModal({ setModalNumber }) {
  const {
    playerOneId,
    myCurrentId,
    setCurrentPlayer,
    setCurrentRoomId,
    setPlayerOneId,
    setPlayerTwoId,
    setGameStarted,
    setPlayerOneName,
    setPlayerTwoName,
    myCurrentName
  } = useGameData();
  const [loading, setLoading] = React.useState(true);
  const handleClose = () => {
    setModalNumber(0);
    setOpen(false);
  };

  const [friendId,setFriendId] = React.useState();

  React.useEffect(() => {
    if (myCurrentId != null) setLoading(false);
  }, [myCurrentId]);

  const enterRandomGame = () => {
    setLoading(true);
    
    socket.emit("enter-random-room", myCurrentId,myCurrentName);
  };

  const enterFriendRoom = ()=>{
    setLoading(true);
    socket.emit("enter-friend-room" , friendId , myCurrentId , myCurrentName);
  }

  React.useEffect(() => {
    // for handling events
    socket.on("game-started", (gameData) => {
      setLoading(false);
      setCurrentPlayer(gameData.currentPlayer);
      setPlayerOneId(gameData.playerOneId);
      setPlayerTwoId(gameData.playerTwoId);
      setCurrentRoomId(gameData.currentRoomId);
      setGameStarted(gameData.gameStarted);
      setPlayerOneName(gameData.playerOneName);
      setPlayerTwoName(gameData.playerTwoName);
    });

    return () => {
      socket.off("game-started", (gameData) => {
        setCurrentPlayer(gameData.currentPlayer);
        setPlayerOneId(gameData.playerOneId);
        setPlayerTwoId(gameData.PlayerTwoId);
        setCurrentRoomId(gameData.currentRoomId);
        setGameStarted(gameData.gameStarted);
        setPlayerOneName(gameData.playerOneName);
        setPlayerTwoName(gameData.playerTwoName);
      });
    };
  }, []);

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography
                sx={{ fontWeight: "normal" }}
                variant="h6"
                component="h6"
              >
                {`Your ID: ${myCurrentId}`}
              </Typography>
              <div className="fined-players flex flex-col items-center mt-2">
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "normal",
                  }}
                  variant="h6"
                  component="h6"
                >
                  You can either :
                </Typography>
                {/* This is the button to search online ============================================================ */}
                <Button
                  onClick={enterRandomGame}
                  sx={{ width: "100%" }}
                  variant="outlined"
                >
                  Search For a Player <LanguageIcon />{" "}
                </Button>
              </div>
              <div className="find-friend flex flex-col items-center mt-2">
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "normal",
                  }}
                  variant="h6"
                  component="h6"
                >
                  Or :
                </Typography>
                <TextField
                  sx={{ width: "100%", mb: 2 }}
                  id="outlined-basic"
                  label="Friend's Id"
                  variant="outlined"
                  placeholder="Friend's Id"
                  onChange={(e)=>setFriendId(e.target.value)}
                />
                {/* This is the button to Play with a friend ============================================================ */}
                <Button onClick={enterFriendRoom} sx={{ width: "100%" }} variant="outlined">
                  Play with a friend <PeopleAltIcon />{" "}
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
