import Player, {
  convertPlayerApiResponseFullDtoToPlayer,
} from "@/player/model/player";
import TeamInstanceAttributes from "./team-attributes";
import TeamInstanceApiResponseFullDto from "./team-instance-api-response-full-dto";

interface TeamInstance {
  id: number;

  name: string;

  description?: string;

  players: Player[];

  teamId?: number;

  attributes: TeamInstanceAttributes;
}

function convertTeamInstanceApiResponseFullDtoToTeamInstance(
  dto: TeamInstanceApiResponseFullDto
): TeamInstance {
  return {
    id: dto.id,
    name: dto.name,
    players: dto.players.map((playerDto) =>
      convertPlayerApiResponseFullDtoToPlayer(playerDto)
    ),
    description: dto.description,
    teamId: dto.teamId,
    attributes: dto.attributes,
  };
}

export default TeamInstance;
export { convertTeamInstanceApiResponseFullDtoToTeamInstance };
