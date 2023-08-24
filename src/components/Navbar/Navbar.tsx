import { useCallback, useContext, useState, MouseEvent } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  AppBar,
  Toolbar,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { post } from '../../common/api/requests';
import AuthContext from '../../context/AuthContext';
import useLogout from '../../hooks/account/useLogout';

function Navbar(): JSX.Element {
  const authCtx = useContext(AuthContext);
  const { logout } = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget),
    []
  );

  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleLogout = useCallback(() => {
    async function handleLogoutInternal(): Promise<void> {
      const response = await post('/api/logout');
      if (response.ok) {
        logout();
      }
    }
    handleLogoutInternal();
  }, [logout]);

  const avatar = (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ marginLeft: 'auto' }}
      >
        Profile
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} to="/profile">
          Profile
        </MenuItem>
        <MenuItem component={RouterLink} to="/account">
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );

  const loginAndLogoutButtons = (
    <>
      <Button
        component={RouterLink}
        to="/login"
        variant="contained"
        color="inherit"
        sx={{ marginLeft: 'auto' }}
      >
        Login
      </Button>
      <Button
        component={RouterLink}
        to="/signup"
        variant="contained"
        color="inherit"
        sx={{ marginLeft: '1em' }}
      >
        Signup
      </Button>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#C3B1E1' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            Dropdown Menu
          </IconButton>
          <Link component={RouterLink} to="/" color="inherit">
            Playground
          </Link>
          {authCtx.isAuthenticated() ? avatar : loginAndLogoutButtons}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
