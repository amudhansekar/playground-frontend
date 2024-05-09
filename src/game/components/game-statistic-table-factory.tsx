import SportType from "@/common/constants/sport-type";
import BasketballGameBoxScores from "@/statistics/components/basketball-game-box-scores";
import GameApiResponseFullDto from "../model/game-api-response-full-dto";

interface Props {
  gameApiResponseFullDto: GameApiResponseFullDto;
}

function GameStatisticTableFactory(props: Props) {
  const { gameApiResponseFullDto } = props;

  switch (gameApiResponseFullDto.sportType) {
    case SportType.BASKETBALL:
      return (
        <BasketballGameBoxScores
          gameApiResponseFullDto={gameApiResponseFullDto}
        />
      );
    default:
      return null;
  }
}

export default GameStatisticTableFactory;
