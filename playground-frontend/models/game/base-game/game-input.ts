import SportType from '@/common/constants/sport-type';
import GameApiRequestSaveDto from './game-api-request-save-dto';
import TeamInstanceInput from '@/models/team/team-instance-input';

class GameInput {
  startDate?: Date;

  sportType: SportType;

  teamInstances: TeamInstanceInput[];

  constructor(
    sportType: SportType,
    startDate?: Date,
    teamInstances: TeamInstanceInput[] = []
  ) {
    this.startDate = startDate;
    this.sportType = sportType;
    this.teamInstances = teamInstances;
  }

  convertToGameApiRequestSaveDto(): GameApiRequestSaveDto {
    if (this.startDate === undefined) {
      throw new Error('start date must be defined');
    }

    return {
      start_date: this.startDate.toISOString(),
      sport_type: this.sportType,
      team_instances: this.teamInstances.map((teamInstance) =>
        teamInstance.convertToTeamInstanceApiRequestSaveDto()
      ),
    };
  }
}

export default GameInput;
