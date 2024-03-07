import realPhoto from "../assets/real_game.jpg";
export default function RulesView() {
  return (
    <div>
      <img src={realPhoto} alt="" />
      <p className="my-4 text-gray-100">
        Connect Four is a game in which the players choose a color and then take
        turns dropping colored tokens into a six-row, seven-column vertically
        suspended grid.
      </p>
      <p className="my-4 text-gray-100">
        The pieces fall straight down, occupying the lowest available space
        within the column. The objective of the game is to be the first to form
        a horizontal, vertical, or diagonal line of four of one's own tokens.
      </p>
      <p className="my-4 text-gray-100">
        Connect Four is a solved game. The first player can always win by
        playing the right moves.
      </p>
      <p className="my-4 text-gray-100">
        The game was created by Howard Wexler, and first sold under the Connect
        Four trademark by Milton Bradley in February 1974.
      </p>
    </div>
  );
}
