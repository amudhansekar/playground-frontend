import SportType from "@/common/constants/sport-type";
import TeamInstanceInput, {
  convertTeamInstanceToTeamInstanceInput,
} from "@/team/model/team-instance-input";
import Game from "./game";

interface GameInput {
  id?: string;

  startDate?: Date;

  sportType: SportType;

  teamInstances: TeamInstanceInput[];
}

function convertGameToGameInput(game: Game): GameInput {
  return {
    id: game.id.toString(),
    sportType: game.sportType,
    startDate: game.startDate,
    teamInstances: game.teamInstances.map((teamInstance) =>
      convertTeamInstanceToTeamInstanceInput(teamInstance)
    ),
  };
}

export default GameInput;
export { convertGameToGameInput };
