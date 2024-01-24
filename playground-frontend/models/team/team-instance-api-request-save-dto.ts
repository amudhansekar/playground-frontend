interface TeamInstanceApiRequestSaveDto {
  id?: number;

  name: string;

  description?: string;

  playerIds: number[];

  teamId?: number;

  attributes: object;
}

export default TeamInstanceApiRequestSaveDto;
