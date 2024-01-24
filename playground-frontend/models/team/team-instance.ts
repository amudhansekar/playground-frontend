import { keysToCamelCase, keysToSnakeCase } from '@/common/api/object-util';
import Player from '../player/player';
import TeamInstanceApiRequestSaveDto from './team-instance-api-request-save-dto';
import TeamInstanceApiResponsePublicDto from './team-instance-api-response-full-dto';

class TeamInstance {
  id: number;

  name: string;

  description?: string;

  players: Player[];

  teamId?: number;

  attributes: object;

  constructor(
    id: number,
    name: string,
    players: Player[],
    description?: string,
    teamId?: number,
    attributes: object = {}
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.players = players;
    this.teamId = teamId;
    this.attributes = attributes;
  }

  static convertFromTeamInstanceApiResponsePublicDto(
    dto: TeamInstanceApiResponsePublicDto
  ): TeamInstance {
    return new TeamInstance(
      dto.id,
      dto.name,
      dto.players.map((playerDto) =>
        Player.convertFromPlayerApiResponseFullDto(playerDto)
      ),
      dto.description,
      dto.teamId,
      dto.attributes
    );
  }

  convertToTeamInstanceApiRequestSaveDto(): TeamInstanceApiRequestSaveDto {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      playerIds: this.players.map((player) => player.id),
      teamId: this.teamId,
      attributes: this.attributes,
    };
  }
}

export default TeamInstance;
