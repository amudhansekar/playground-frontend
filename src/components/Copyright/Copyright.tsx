import { Typography } from '@mui/material';

function Copyright(): JSX.Element {
  return (
    <Typography
      component="span"
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {'Copyright © '}
      <Typography color="inherit">Playground</Typography>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default Copyright;
