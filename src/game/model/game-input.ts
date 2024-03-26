import SportType from "@/common/constants/sport-type";
import TeamInstanceInput from "@/team/model/team-instance-input";
import Game from "./game";

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

  static convertFromGame(game: Game) {
    return new GameInput(
      game.sportType,
      game.id.toString(),
      game.startDate,
      game.teamInstances.map((teamInstance) =>
        TeamInstanceInput.convertFromTeamInstance(teamInstance)
      )
    );
  }
}

export default GameInput;
