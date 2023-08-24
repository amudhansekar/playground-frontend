import { Box, Container } from '@mui/material';
import Copyright from '../Copyright/Copyright';

function Footer(): JSX.Element {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
