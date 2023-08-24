import { useContext, useState } from 'react';
import AuthContext, { AuthAction } from '../../context/AuthContext';
import SignupApiRequestDto from '../../models/account/signup-api-request-dto';
import { post } from '../../common/api/requests';

interface UseSignupReturnValues {
  signup: (signUpApiRequest: SignupApiRequestDto) => void;
  isLoading: boolean;
  error: unknown;
}

function useSignup(): UseSignupReturnValues {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  async function signup(signUpApiRequest: SignupApiRequestDto): Promise<void> {
    setIsLoading(true);
    setError(null);

    const response = await post(
      '/api/account/register',
      JSON.stringify(signUpApiRequest)
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // update the auth context
      dispatch({ authAction: AuthAction.LOGIN, payload: json });

      // update loading state
      setIsLoading(false);
    }
  }

  return { signup, isLoading, error };
}

export default useSignup;
