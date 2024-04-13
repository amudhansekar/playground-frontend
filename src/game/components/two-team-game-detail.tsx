import { TwoTeamGameTeamPosition } from "@/common/constants/team-constants";
import TeamInstanceTable from "@/team/components/team-instance-table";
import TeamInstance from "@/team/model/team-instance";
import Game from "../model/game";

interface Props {
  game: Game;
}

function TwoTeamGameDetail(props: Props): JSX.Element {
  const { game } = props;
  const awayTeam = getTeamByPosition(game, TwoTeamGameTeamPosition.AWAY);
  const homeTeam = getTeamByPosition(game, TwoTeamGameTeamPosition.HOME);

  return (
    <>
      <h2 className={`mb-3 text-2xl font-semibold`}>Away Team</h2>
      <h3>{awayTeam !== undefined && awayTeam.name}</h3>
      <p>{awayTeam !== undefined && awayTeam.description}</p>
      {awayTeam !== undefined && (
        <TeamInstanceTable players={awayTeam?.players} />
      )}
      <h2 className={`mb-3 text-2xl font-semibold`}>Home Team</h2>
      <h3>{homeTeam !== undefined && homeTeam.name}</h3>
      <p>{homeTeam !== undefined && homeTeam.description}</p>
      {homeTeam !== undefined && (
        <TeamInstanceTable players={homeTeam?.players} />
      )}
    </>
  );
}

function getTeamByPosition(
  game: Game,
  position: TwoTeamGameTeamPosition
): TeamInstance | undefined {
  return game.teamInstances.find(
    (teamInstance) => teamInstance.attributes.twoTeamGamePosition === position
  );
}

export default TwoTeamGameDetail;
