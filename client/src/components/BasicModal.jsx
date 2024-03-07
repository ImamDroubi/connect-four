import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { socket } from "../socket.js";
import { useGameData } from "../contexts/gameDataContext.jsx";
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

export default function BasicModal({ setModalNumber }) {
  const [open, setOpen] = React.useState(false);
  const { setMyCurrentId, setMyCurrentName } = useGameData();
  const [name,setName] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGenerateName = (name) => {
    setMyCurrentName(name);
  };
  const handleButtonClick = () => {
    console.log(name)
    handleGenerateName(name);
    setModalNumber(1);
  };
  React.useEffect(() => {
    socket.on("id-generated", (socketId) => {
      setMyCurrentId(socketId);
    });

    return () => {
      socket.off("id-generated", (socketId) => {
        setMyCurrentId(socketId);
      });
    };
  }, []);

  return (
    <div>
      <Button
        sx={{
          padding: "15px",
          color: "white",
          ":hover": { backgroundColor: "rgba(0,0,0,0.7)" },
        }}
        onClick={handleOpen}
      >
        Start Game
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ mb: 2 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Provide your information
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Display Name"
            variant="outlined"
            placeholder="Player 1"
            onChange={(e)=>setName(e.target.value)}
          />
          <Button
            variant="contained"
            disableElevation
            sx={{ width: "100%", mt: 2 }}
            onClick={handleButtonClick}
          >
            Continue
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
