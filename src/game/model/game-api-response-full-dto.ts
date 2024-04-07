import { GameState } from "@/common/constants/game-constants";
import SportType from "@/common/constants/sport-type";
import TeamInstanceApiResponseFullDto from "@/team/model/team-instance-api-response-full-dto";

interface GameApiResponseFullDto {
  id: number;

  startDate: string;

  sportType: SportType;

  gameState: GameState;

  teamInstances: TeamInstanceApiResponseFullDto[];

  endDate?: string;
}

export default GameApiResponseFullDto;
