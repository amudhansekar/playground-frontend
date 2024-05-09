import { GameState } from "@/common/constants/game-constants";
import SportType from "@/common/constants/sport-type";
import TeamInstance, {
  convertTeamInstanceApiResponseFullDtoToTeamInstance,
} from "@/team/model/team-instance";
import { ZonedDateTime, parseAbsoluteToLocal } from "@internationalized/date";
import GameApiResponseFullDto from "./game-api-response-full-dto";

interface Game {
  id: number;

  startDate: ZonedDateTime;

  endDate?: ZonedDateTime;

  sportType: SportType;

  gameState: GameState;

  teamInstances: TeamInstance[];
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
  };
}

export default Game;
export { convertGameApiResponseFullDtoToGame };
