import IPlayer from './iplayer';
import PlayerApiRequestSaveDto from './player-api-request-save-dto';
import PlayerApiResponseFullDto from './player-api-response-full-dto';

class Player implements IPlayer {
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
      dto.first_name,
      dto.last_name,
      dto.age,
      dto.height,
      dto.weight
    );
  }

  convertToPlayerApiRequestSaveDto(): PlayerApiRequestSaveDto {
    return {
      first_name: this.firstName,
      last_name: this.lastName,
      age: this.age,
      height: this.height,
      weight: this.weight,
    };
  }
}

export default Player;
