import SportType from '@/common/constants/sport-type';
import TeamInstanceApiRequestSaveDto from '@/models/team/team-instance-api-request-save-dto';

interface GameApiRequestSaveDto {
  start_date: string;

  sport_type: SportType;

  team_instances: TeamInstanceApiRequestSaveDto[];

  end_date?: string;
}

export default GameApiRequestSaveDto;
