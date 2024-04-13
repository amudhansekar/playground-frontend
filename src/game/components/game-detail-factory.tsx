import SportType from "@/common/constants/sport-type";
import Game from "../model/game";
import TwoTeamGameDetail from "./two-team-game-detail";

interface Props {
  game: Game;
}

function GameDetailFactory(props: Props) {
  const { game } = props;

  switch (game.sportType) {
    case SportType.BASKETBALL:
    case SportType.FOOTBALL:
      return <TwoTeamGameDetail game={game} />;
    default:
      return <div />;
  }
}

export default GameDetailFactory;
