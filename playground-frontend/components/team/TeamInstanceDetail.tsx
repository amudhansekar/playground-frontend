import TeamInstance from '@/models/team/team-instance';
import PlayerCard from '../player/PlayerCard';

interface Props {
  teamInstance: TeamInstance;
}

function TeamInstanceDetail(props: Props) {
  const { teamInstance } = props;

  return (
    <>
      <h1>{teamInstance.name}</h1>
      <p>{teamInstance.description}</p>
      {teamInstance.players.map((player, index) => (
        <div key={index}>
          <PlayerCard player={player} />
        </div>
      ))}
    </>
  );
}

export default TeamInstanceDetail;
