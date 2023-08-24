import { FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button } from '@mui/material';
import { postReturnData } from '../../common/api/requests';
import PlayerApiResponseFullDto from '../../models/player/player-api-response-full-dto';
import PlayerEdit from '../../components/player/PlayerDetail/PlayerEdit';
import useEditPlayer from '../../hooks/player/useEditPlayer';
import Player from '../../models/player/player';

function NewPlayerPage(): JSX.Element {
  const navigate = useNavigate();
  const { player, playerEditFunctions } = useEditPlayer();

  const submitHandlerWrapper = useCallback(
    async function submitHandler(
      event: FormEvent<HTMLFormElement>
    ): Promise<void> {
      event.preventDefault();
      if (player.firstName === undefined) {
        return;
      }
      if (player.lastName === undefined) {
        return;
      }
      try {
        const playerToSubmit = new Player(
          NaN,
          player.firstName,
          player.lastName,
          player.age,
          player.height,
          player.weight
        );
        const response = (await postReturnData(
          '/api/player',
          JSON.stringify(playerToSubmit.convertToPlayerApiRequestSaveDto())
        )) as PlayerApiResponseFullDto;
        navigate(`/player/${response.id}`, { state: { player: response } });
      } catch (error) {
        /* todo - handle errros better */
      }
    },
    [navigate, player]
  );

  const cancelHandlerWrapper = useCallback(
    function cancelHandler() {
      navigate('/');
    },
    [navigate]
  );

  return (
    <Box
      component="form"
      onSubmit={submitHandlerWrapper}
      m="auto"
      sx={{ width: '50%', mt: 1 }}
    >
      <Button onClick={cancelHandlerWrapper}>Cancel</Button>
      <Button type="submit">Submit</Button>
      <PlayerEdit player={player} playerEditFunctions={playerEditFunctions} />
    </Box>
  );
}

export default NewPlayerPage;
