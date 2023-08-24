import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  isLoggedIn: boolean;
  children: JSX.Element;
}

function ProtectedRoute(props: Props): JSX.Element {
  const navigate = useNavigate();

  const { isLoggedIn, children } = props;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return children;
}

export default ProtectedRoute;
