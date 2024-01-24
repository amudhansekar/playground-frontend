import { GameState } from '@/common/constants/game-constants';
import SportType from '@/common/constants/sport-type';
import TeamInstanceApiResponseFullDto from '@/models/team/team-instance-api-response-full-dto';

interface GameApiResponseFullDto {
  id: number;

  startDate: string;

  sportType: SportType;

  gameState: GameState;

  teamInstances: TeamInstanceApiResponseFullDto[];

  end_date?: string;
}

export default GameApiResponseFullDto;
