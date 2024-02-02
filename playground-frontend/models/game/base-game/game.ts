import { GameState } from '@/common/constants/game-constants';
import SportType from '@/common/constants/sport-type';
import TeamInstance from '@/models/team/team-instance';
import GameApiResponseFullDto from './game-api-response-full-dto';

class Game {
  id: number;

  startDate: Date;

  endDate?: Date;

  sportType: SportType;

  gameState: GameState;

  teamInstances: TeamInstance[];

  constructor(
    id: number,
    startDate: Date,
    sportType: SportType,
    gameState: GameState,
    teamInstances: TeamInstance[] = [],
    endDate?: Date
  ) {
    this.id = id;
    this.startDate = startDate;
    this.sportType = sportType;
    this.gameState = gameState;
    this.teamInstances = teamInstances;
    this.endDate = endDate;
  }

  static convertFromGameApiResponsePublicDto(
    dto: GameApiResponseFullDto
  ): Game {
    return new Game(
      dto.id,
      new Date(dto.startDate),
      dto.sportType,
      dto.gameState,
      dto.teamInstances.map((teamInstance) =>
        TeamInstance.convertFromTeamInstanceApiResponsePublicDto(teamInstance)
      ),
      dto.end_date === undefined ? undefined : new Date(dto.end_date)
    );
  }
}

export default Game;
