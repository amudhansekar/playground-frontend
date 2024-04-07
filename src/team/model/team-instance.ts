import Player, {
  convertPlayerApiResponseFullDtoToPlayer,
} from "@/player/model/player";
import TeamInstanceAttributes from "./team-attributes";
import TeamInstanceApiResponseFullDto from "./team-instance-api-response-full-dto";

class TeamInstance {
  id: number;

  name: string;

  description?: string;

  players: Player[];

  teamId?: number;

  attributes: TeamInstanceAttributes;

  constructor(
    id: number,
    name: string,
    players: Player[],
    description?: string,
    teamId?: number,
    attributes: TeamInstanceAttributes = {}
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.players = players;
    this.teamId = teamId;
    this.attributes = attributes;
  }

  static convertFromTeamInstanceApiResponsePublicDto(
    dto: TeamInstanceApiResponseFullDto
  ): TeamInstance {
    return new TeamInstance(
      dto.id,
      dto.name,
      dto.players.map((playerDto) =>
        convertPlayerApiResponseFullDtoToPlayer(playerDto)
      ),
      dto.description,
      dto.teamId,
      dto.attributes
    );
  }
}

export default TeamInstance;
