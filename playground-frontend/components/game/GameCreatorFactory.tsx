import SportType from '@/common/constants/sport-type';
import TwoTeamGameCreator from './two-team-game/TwoTeamGameCreator';
import { Session } from 'next-auth';

interface Props {
  sportType: SportType;
}

function GameCreatorFactory(props: Props): JSX.Element {
  const { sportType } = props;

  switch (sportType) {
    case SportType.BASKETBALL:
    case SportType.FOOTBALL:
      return <TwoTeamGameCreator sportType={sportType} />;
    default:
      return <div />;
  }
}

export default GameCreatorFactory;
