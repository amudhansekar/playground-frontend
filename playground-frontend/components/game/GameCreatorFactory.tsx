import SportType from '@/common/constants/sport-type';
import GameInput from '@/models/game/base-game/game-input';
import TwoTeamGameCreator from './two-team-game/TwoTeamGameCreator';

interface Props {
  gameInput: GameInput;
}

function GameCreatorFactory(props: Props): JSX.Element {
  const { gameInput } = props;

  switch (gameInput.sportType) {
    case SportType.BASKETBALL:
    case SportType.FOOTBALL:
      return <TwoTeamGameCreator gameInput={gameInput} />;
    default:
      return <div />;
  }
}

export default GameCreatorFactory;
