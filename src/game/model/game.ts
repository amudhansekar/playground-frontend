import { GameState } from "@/common/constants/game-constants";
import SportType from "@/common/constants/sport-type";
import TeamInstance, {
  convertTeamInstanceApiResponseFullDtoToTeamInstance,
} from "@/team/model/team-instance";
import GameApiResponseFullDto from "./game-api-response-full-dto";

interface Game {
  id: number;

  startDate: Date;

  endDate?: Date;

  sportType: SportType;

  gameState: GameState;

  teamInstances: TeamInstance[];
}

function convertGameApiResponseFullDtoToGame(
  dto: GameApiResponseFullDto
): Game {
  return {
    id: dto.id,
    startDate: new Date(dto.startDate),
    sportType: dto.sportType,
    gameState: dto.gameState,
    teamInstances: dto.teamInstances.map((teamInstance) =>
      convertTeamInstanceApiResponseFullDtoToTeamInstance(teamInstance)
    ),
    endDate: dto.endDate === undefined ? undefined : new Date(dto.endDate),
  };
}

export default Game;
export { convertGameApiResponseFullDtoToGame };
