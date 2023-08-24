import { ChangeEvent, useCallback } from 'react';
import { TextField } from '@mui/material';
import IPlayer from '../../../models/player/iplayer';
import { PlayerEditFunctions } from '../../../hooks/player/useEditPlayer';

interface Props {
  player: IPlayer;
  playerEditFunctions: PlayerEditFunctions;
}

function PlayerEdit(props: Props): JSX.Element {
  const { player, playerEditFunctions } = props;

  const firstNameChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      playerEditFunctions.setFirstName(event.target.value),
    [playerEditFunctions]
  );

  const lastNameChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      playerEditFunctions.setLastName(event.target.value),
    [playerEditFunctions]
  );

  const ageChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      playerEditFunctions.setAge(event.target.valueAsNumber),
    [playerEditFunctions]
  );

  const heightChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      playerEditFunctions.setHeight(event.target.valueAsNumber),
    [playerEditFunctions]
  );

  const weightChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      playerEditFunctions.setWeight(event.target.valueAsNumber),
    [playerEditFunctions]
  );

  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="firstName"
        name="firstName"
        label="First Name"
        type="text"
        defaultValue={player.firstName}
        onChange={firstNameChangeHandler}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        name="lastName"
        label="Last Name"
        type="text"
        defaultValue={player.lastName}
        onChange={lastNameChangeHandler}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="age"
        name="age"
        label="Age"
        type="number"
        defaultValue={player.age}
        onChange={ageChangeHandler}
      />
      <TextField
        margin="normal"
        fullWidth
        id="height"
        name="height"
        label="Height"
        type="number"
        defaultValue={player.height}
        onChange={heightChangeHandler}
      />
      <TextField
        margin="normal"
        fullWidth
        id="weight"
        name="weight"
        label="Weight"
        type="number"
        defaultValue={player.weight}
        onChange={weightChangeHandler}
      />
    </>
  );
}

export default PlayerEdit;
