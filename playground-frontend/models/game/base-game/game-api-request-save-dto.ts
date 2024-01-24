import SportType from '@/common/constants/sport-type';
import TeamInstanceApiRequestSaveDto from '@/models/team/team-instance-api-request-save-dto';

interface GameApiRequestSaveDto {
  id?: number;

  startDate: string;

  sportType: SportType;

  teamInstances: TeamInstanceApiRequestSaveDto[];
}

export default GameApiRequestSaveDto;
