import SportType from "@/common/constants/sport-type";
import Game from "../model/game";
import GameApiResponseFullDto from "../model/game-api-response-full-dto";
import BasketballStatisticTable from "./basketball-statistic-table";

interface Props {
  game: GameApiResponseFullDto;
}

function StatisticTableFactory(props: Props) {
  const { game } = props;

  switch (game.sportType) {
    case SportType.BASKETBALL:
      <BasketballStatisticTable
        game={Game.convertFromGameApiResponsePublicDto(game)}
      />;
    default:
      return null;
  }
}

export default StatisticTableFactory;
