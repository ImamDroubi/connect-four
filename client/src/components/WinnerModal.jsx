import { Typography } from "@mui/material";
import { useGameData } from "../contexts/gameDataContext"
import Button from "@mui/material/Button";

export default function WinnerModal() {
  const {winner , setWinner} = useGameData(); 

  return (
    <div className="text-center h-[10rem]">
      <Typography
        sx={{ mb: 2 }}
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        {`${winner} Wins!`}
      </Typography>

      <Button onClick={()=>setWinner(null)} disableElevation sx={{width : "250px"}} variant="contained">
        Home
      </Button>
    </div>
  )
}
