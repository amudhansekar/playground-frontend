import Game from '@/models/game/base-game/game';
import TeamInstanceDetail from '../team/TeamInstanceDetail';

interface Props {
  game: Game;
}

function TwoTeamGameDetail(props: Props) {
  const { game } = props;

  const awayTeam = game.teamInstances[0];
  const homeTeam = game.teamInstances[1];

  return (
    <>
      <h1 className="col-span-full max-w-64 m-auto">{game.sportType}</h1>
      <h1 className="col-span-full max-w-64 m-auto">{game.gameState}</h1>
      <h3 className="col-span-full max-w-128 m-auto">
        Start Date: {game.startDate.toLocaleString()}
      </h3>
      <div className="grid grid-cols-2">
        <div className="col-span-1 m-auto">
          <h2 className="mt-4 mb-4 text-4xl">Away Team</h2>
          <TeamInstanceDetail teamInstance={awayTeam} />
        </div>
        <div className="grid-cols-1 m-auto">
          <h2 className="mt-4 mb-4 text-4xl">Home Team</h2>
          <TeamInstanceDetail teamInstance={homeTeam} />
        </div>
      </div>
    </>
  );
}

export default TwoTeamGameDetail;
