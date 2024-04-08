import SportType from "@/common/constants/sport-type";
import BasketballGameBoxScores from "@/statistics/components/basketball-game-box-scores";
import Game from "../model/game";

interface Props {
  game: Game;
}

function GameStatisticTableFactory(props: Props) {
  const { game } = props;

  switch (game.sportType) {
    case SportType.BASKETBALL:
      return <BasketballGameBoxScores game={game} />;
    default:
      return null;
  }
}

export default GameStatisticTableFactory;
