import SportType from '@/common/constants/sport-type';
import Game from '@/models/game/base-game/game';
import GameApiResponseFullDto from '@/models/game/base-game/game-api-response-full-dto';
import LiveBasketballGame from './basketball/LiveBasketballGame';

interface Props {
  game: GameApiResponseFullDto;
}

async function LiveGame(props: Props) {
  const { game: gameApiResponse } = props;
  const game = Game.convertFromGameApiResponsePublicDto(gameApiResponse);

  switch (game.sportType) {
    case SportType.BASKETBALL:
      return <LiveBasketballGame game={game} />;
    case SportType.FOOTBALL:
    default:
      return <></>;
  }
}

export default LiveGame;
