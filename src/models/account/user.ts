import CurrentUserInfoApiResponseDto from './current-user-info-api-response-dto';

class User {
  email: string;

  firstName: string;

  lastName: string;

  constructor(email: string, firstName: string, lastName: string) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static convertFromAccountUserApiResponse(
    apiResponse: CurrentUserInfoApiResponseDto
  ): User {
    return new User(
      apiResponse.email,
      apiResponse.first_name,
      apiResponse.last_name
    );
  }
}

export default User;
