import { GameState } from "@/common/constants/game-constants";
import SportType from "@/common/constants/sport-type";
import TeamInstance, {
  convertTeamInstanceApiResponseFullDtoToTeamInstance,
} from "@/team/model/team-instance";
import { ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";
import GameApiResponseFullDto from "./game-api-response-full-dto";
import Livestream, {
  convertLivestreamApiResponseFullDtoToLivestream,
} from "./livestream";

interface Game {
  id: number;

  startDate: ZonedDateTime;

  endDate?: ZonedDateTime;

  sportType: SportType;

  gameState: GameState;

  teamInstances: TeamInstance[];

  livestreams: Livestream[];
}

function convertGameApiResponseFullDtoToGame(
  dto: GameApiResponseFullDto
): Game {
  return {
    id: dto.id,
    startDate: parseAbsoluteToLocal(dto.startDate),
    sportType: dto.sportType,
    gameState: dto.gameState,
    teamInstances: dto.teamInstances.map((teamInstance) =>
      convertTeamInstanceApiResponseFullDtoToTeamInstance(teamInstance)
    ),
    endDate: !dto.endDate ? undefined : parseAbsoluteToLocal(dto.endDate),
    livestreams: !dto.livestreams
      ? []
      : dto.livestreams.map((livestream) =>
          convertLivestreamApiResponseFullDtoToLivestream(livestream)
        ),
  };
}

export default Game;
export { convertGameApiResponseFullDtoToGame };
