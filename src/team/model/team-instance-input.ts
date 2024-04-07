import Player from "@/player/model/player";
import TeamInstanceAttributes from "./team-attributes";
import TeamInstance from "./team-instance";

interface TeamInstanceInput {
  id: string;

  name?: string;

  description?: string;

  players: Player[];

  teamId?: number;

  attributes: TeamInstanceAttributes;
}

function convertTeamInstanceToTeamInstanceInput(
  teamInstance: TeamInstance
): TeamInstanceInput {
  return {
    id: teamInstance.id.toString(),
    name: teamInstance.name,
    players: teamInstance.players,
    description: teamInstance.description,
    teamId: teamInstance.teamId,
    attributes: teamInstance.attributes,
  };
}

export default TeamInstanceInput;
export { convertTeamInstanceToTeamInstanceInput };
