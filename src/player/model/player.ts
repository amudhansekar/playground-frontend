import PlayerApiResponseFullDto from "./player-api-response-full-dto";

interface Player {
  id: number;

  firstName: string;

  lastName: string;

  age?: number;

  height?: number;

  weight?: number;
}

function convertPlayerApiResponseFullDtoToPlayer(
  dto: PlayerApiResponseFullDto
): Player {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    age: dto.age,
    height: dto.height,
    weight: dto.weight,
  };
}

export default Player;
export { convertPlayerApiResponseFullDtoToPlayer };
