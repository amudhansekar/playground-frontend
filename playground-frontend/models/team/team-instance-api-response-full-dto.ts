import PlayerApiResponseFullDto from '../player/player-api-response-full-dto';

interface TeamInstanceApiResponseFullDto {
  id: number;

  name: string;

  description?: string;

  players: PlayerApiResponseFullDto[];

  team_id?: number;

  attributes: any;
}

export default TeamInstanceApiResponseFullDto;
