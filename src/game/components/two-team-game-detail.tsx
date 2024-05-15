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
    <div className="mt-8 grid grid-cols-2 text-center w-full">
      <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <h2 className="mb-3 text-2xl font-semibold">Away Team</h2>
        <h3 className="mb-3 text-xl font-semibold">
          {awayTeam !== undefined && awayTeam.name}
        </h3>
        <p>{awayTeam !== undefined && awayTeam.description}</p>
        {awayTeam !== undefined && (
          <TeamInstanceTable players={awayTeam?.players} />
        )}
      </div>

      <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
        <h2 className="mb-3 text-2xl font-semibold">Home Team</h2>
        <h3 className="mb-3 text-xl font-semibold">
          {homeTeam !== undefined && homeTeam.name}
        </h3>
        <p>{homeTeam !== undefined && homeTeam.description}</p>
        {homeTeam !== undefined && (
          <TeamInstanceTable players={homeTeam?.players} />
        )}
      </div>
    </div>
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
