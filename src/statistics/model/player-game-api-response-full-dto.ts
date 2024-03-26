import PlayerApiResponseFullDto from "@/player/model/player-api-response-full-dto";

interface PlayerGameIdApiResponseFullDto {
  player: PlayerApiResponseFullDto;
  gameId: number;
}

export default PlayerGameIdApiResponseFullDto;
