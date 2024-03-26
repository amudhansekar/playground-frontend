interface TeamInstanceApiRequestSaveDto {
  id?: number | null;

  name: string;

  description?: string;

  playerIds: number[];

  teamId?: number;

  attributes: object;
}

export default TeamInstanceApiRequestSaveDto;
