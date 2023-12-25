interface TeamInstanceApiRequestSaveDto {
  id?: number;

  name: string;

  description?: string;

  player_ids: number[];

  team_id?: number;

  attributes: object;
}

export default TeamInstanceApiRequestSaveDto;
