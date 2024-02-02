import PlayerApiResponseFullDto from '@/models/player/player-api-response-full-dto';

interface PlayerGameIdApiResponseFullDto {
  player: PlayerApiResponseFullDto;
  gameId: number;
}

export default PlayerGameIdApiResponseFullDto;
