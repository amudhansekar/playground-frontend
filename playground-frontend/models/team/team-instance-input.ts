import { keysToSnakeCase } from '@/common/api/object-util';
import Player from '../player/player';
import TeamInstanceApiRequestSaveDto from './team-instance-api-request-save-dto';

class TeamInstanceInput {
  name?: string;

  description?: string;

  players: Player[];

  teamId?: number;

  attributes: object;

  constructor(
    name?: string,
    players: Player[] = [],
    description?: string,
    teamId?: number,
    attributes: object = {}
  ) {
    this.name = name;
    this.description = description;
    this.players = players;
    this.teamId = teamId;
    this.attributes = attributes;
  }

  convertToTeamInstanceApiRequestSaveDto(): TeamInstanceApiRequestSaveDto {
    if (this.name === undefined) {
      throw new Error('name must be defined');
    }

    return {
      name: this.name,
      description: this.description,
      player_ids: this.players.map((player) => player.id),
      team_id: this.teamId,
      attributes: keysToSnakeCase(this.attributes),
    };
  }
}

export default TeamInstanceInput;
