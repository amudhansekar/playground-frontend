import { Typography } from '@mui/material';
import IPlayer from '../../../models/player/iplayer';

interface Props {
  player: IPlayer;
}

function PlayerDetail(props: Props): JSX.Element {
  const { player } = props;

  return (
    <>
      <Typography>First Name: {player.firstName}</Typography>
      <Typography>Last Name: {player.lastName}</Typography>
      <Typography>Age: {player.age}</Typography>
      <Typography>Height: {player.height}</Typography>
      <Typography>Weight: {player.weight}</Typography>
    </>
  );
}

export default PlayerDetail;
