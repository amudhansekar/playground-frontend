import PlayerApiResponseFullDto from "@/player/model/player-api-response-full-dto";

interface TeamInstanceApiResponseFullDto {
  id: number;

  name: string;

  description?: string;

  players: PlayerApiResponseFullDto[];

  teamId?: number;

  attributes: any;

  score?: any;
}

export default TeamInstanceApiResponseFullDto;
