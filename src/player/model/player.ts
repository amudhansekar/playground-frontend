import PlayerApiResponseFullDto from "./player-api-response-full-dto";

class Player {
  id: number;

  firstName: string;

  lastName: string;

  age?: number;

  height?: number;

  weight?: number;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    age?: number,
    height?: number,
    weight?: number
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.height = height;
    this.weight = weight;
  }

  static convertFromPlayerApiResponseFullDto(
    dto: PlayerApiResponseFullDto
  ): Player {
    return new Player(
      dto.id,
      dto.firstName,
      dto.lastName,
      dto.age,
      dto.height,
      dto.weight
    );
  }
}

export default Player;
