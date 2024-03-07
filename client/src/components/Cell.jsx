import Token from "./Token";

import { socket } from "../socket";

export default function Cell({
  row = 0,
  col = 0,
  number = 0,
  clickable = false,
}) {
  const clickableStyles = "cursor-pointer hover:bg-[rgba(0,0,100,0.3)] ";

  const handleClick = () => {
    if(!clickable)return;
    socket.emit("action-performed", row, col);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center border-2  border-primary-300 ${
        clickable ? clickableStyles : ""
      }`}
    >
      {number == 1 ? (
        <Token color={0} />
      ) : number == 2 ? (
        <Token color={1} />
      ) : null}
    </div>
  );
}
