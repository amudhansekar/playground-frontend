/* eslint-disable react/destructuring-assignment */
import {
  Dispatch,
  ReactElement,
  createContext,
  useEffect,
  useReducer,
} from 'react';
import CurrentUserInfoApiResponseDto from '../models/account/current-user-info-api-response-dto';
import { get } from '../common/api/requests';
import User from '../models/account/user';

enum AuthAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface AuthEvent {
  payload: User | null;
  authAction: AuthAction;
  refreshCsrf?: boolean;
}

interface AuthContextInterface {
  user: User | null;
  dispatch: Dispatch<AuthEvent>;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextInterface>({
  user: null,
  dispatch: () => {},
  isAuthenticated: () => {
    return false;
  },
});

interface AuthReducerReturnType {
  user: User | null;
}

function authReducer(
  state: AuthReducerReturnType,
  authEvent: AuthEvent
): AuthReducerReturnType {
  switch (authEvent.authAction) {
    case AuthAction.LOGIN:
      if (authEvent.refreshCsrf !== false) {
        get('/api/account');
      }
      return { user: authEvent.payload };
    case AuthAction.LOGOUT:
      if (authEvent.refreshCsrf !== false) {
        get('/api/account');
      }
      return { user: null };
    default:
      return state;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthContextProvider(props: any): ReactElement {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  function isAuthenticated(): boolean {
    return state.user !== null;
  }

  /** initializes the csrf token cookie and checks if a user is logged in */
  async function getUserDataFromServer(): Promise<User | null> {
    const response = await get('/api/account');
    try {
      const authenticateResponse: CurrentUserInfoApiResponseDto =
        await response.json();
      const user = User.convertFromAccountUserApiResponse(authenticateResponse);
      return user;
    } catch {
      // not logged in - no body when trying to parse the json response
      return null;
    }
  }

  useEffect(() => {
    async function initUser(): Promise<void> {
      const user = await getUserDataFromServer();
      if (user !== null) {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({
          authAction: AuthAction.LOGIN,
          payload: user,
          refreshCsrf: false,
        });
      } else {
        localStorage.removeItem('user');
        dispatch({
          authAction: AuthAction.LOGOUT,
          payload: user,
          refreshCsrf: false,
        });
      }
    }

    initUser();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ ...state, dispatch, isAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider, AuthAction };
