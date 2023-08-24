import { useContext } from 'react';
import AuthContext, { AuthAction } from '../../context/AuthContext';

interface UseLogoutReturnValues {
  logout: () => void;
}

function useLogout(): UseLogoutReturnValues {
  const { dispatch } = useContext(AuthContext);

  function logout(): void {
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ authAction: AuthAction.LOGOUT, payload: null });
  }
  return { logout };
}

export default useLogout;
