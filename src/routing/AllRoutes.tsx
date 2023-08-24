import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import AuthContext from '../context/AuthContext';
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import LoginPage from '../pages/account/LoginPage/LoginPage';
import SignupPage from '../pages/account/SignupPage/SignupPage';
import NewPlayerPage from '../pages/PlayerDetailPage/NewPlayerPage';
import PlayerDetailPage from '../pages/PlayerDetailPage/PlayerDetailPage';

function AllRoutes(): JSX.Element {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route
        path="player"
        element={
          <ProtectedRoute isLoggedIn={authCtx.isAuthenticated()}>
            <NewPlayerPage />
          </ProtectedRoute>
        }
      />
      <Route path="player/:playerId" element={<PlayerDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AllRoutes;
