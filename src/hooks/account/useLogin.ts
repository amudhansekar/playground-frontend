import { useContext, useState } from 'react';
import AuthContext, { AuthAction } from '../../context/AuthContext';
import CurrentUserInfoApiResponseDto from '../../models/account/current-user-info-api-response-dto';
import { get } from '../../common/api/requests';
import User from '../../models/account/user';

interface UseLoginReturnValues {
  login: (email: string, password: string) => void;
  isLoading: boolean;
  error: unknown;
}

function useLogin(): UseLoginReturnValues {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  async function login(email: string, password: string): Promise<void> {
    setIsLoading(true);
    setError(null);

    const data = new FormData();
    data.append('username', email);
    data.append('password', password);

    // Need to use fetch here directly b/c dealing with form data
    // todo - use env file
    const response: Response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      setIsLoading(false);
      const json = await response.json();
      setError(json.error);
    }
    if (response.ok) {
      const currentUserResponse = await get('/api/account');
      const authenticateResponse: CurrentUserInfoApiResponseDto =
        await currentUserResponse.json();
      const user = User.convertFromAccountUserApiResponse(authenticateResponse);

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(user));

      // update the auth context
      dispatch({ authAction: AuthAction.LOGIN, payload: user });

      // update loading state
      setIsLoading(false);
      setError(null);
    }
  }

  return { login, isLoading, error };
}

export default useLogin;
