import Player from "@/player/model/player";
import TeamInstanceAttributes from "./team-attributes";
import TeamInstance from "./team-instance";

class TeamInstanceInput {
  id: string;

  name?: string;

  description?: string;

  players: Player[];

  teamId?: number;

  attributes: TeamInstanceAttributes;

  constructor(
    id: string,
    name?: string,
    players: Player[] = [],
    description?: string,
    teamId?: number,
    attributes: TeamInstanceAttributes = {}
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.players = players;
    this.teamId = teamId;
    this.attributes = attributes;
  }

  static convertFromTeamInstance(teamInstance: TeamInstance) {
    return new TeamInstanceInput(
      teamInstance.id.toString(),
      teamInstance.name,
      teamInstance.players,
      teamInstance.description,
      teamInstance.teamId,
      teamInstance.attributes
    );
  }
}

export default TeamInstanceInput;
