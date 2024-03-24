import SportType from "@/common/constants/sport-type";
import TeamInstanceInput from "@/team/model/team-instance-input";

class GameInput {
  id?: string;

  startDate?: Date;

  sportType: SportType;

  teamInstances: TeamInstanceInput[];

  constructor(
    sportType: SportType,
    id?: string,
    startDate?: Date,
    teamInstances: TeamInstanceInput[] = []
  ) {
    this.startDate = startDate;
    this.id = id;
    this.sportType = sportType;
    this.teamInstances = teamInstances;
  }
}

export default GameInput;
