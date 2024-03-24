import Player from "@/player/model/player";
import TeamInstanceAttributes from "./team-attributes";

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
}

export default TeamInstanceInput;
