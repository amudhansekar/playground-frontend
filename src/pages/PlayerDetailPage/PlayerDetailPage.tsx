import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getReturnData, putReturnData } from '../../common/api/requests';
import PlayerApiResponseFullDto from '../../models/player/player-api-response-full-dto';
import Player from '../../models/player/player';
import ViewEditBox from '../../components/ViewEditBox/ViewEditBox';
import Mode from '../../common/constants/edit-mode';
import PlayerDetail from '../../components/player/PlayerDetail/PlayerDetail';
import PlayerEdit from '../../components/player/PlayerDetail/PlayerEdit';
import PlaygroundApiError from '../../common/error/playground-api-error';
import useEditPlayer, {
  PlayerEditFunctions,
} from '../../hooks/player/useEditPlayer';

function setPlayerValues(
  playerEditFunctions: PlayerEditFunctions,
  playerApiResponseFullDto: PlayerApiResponseFullDto
) {
  playerEditFunctions.setFirstName(playerApiResponseFullDto.first_name);
  playerEditFunctions.setLastName(playerApiResponseFullDto.last_name);
  playerEditFunctions.setAge(playerApiResponseFullDto.age);
  playerEditFunctions.setHeight(playerApiResponseFullDto.height);
  playerEditFunctions.setWeight(playerApiResponseFullDto.weight);
}

function PlayerDetailPage(): JSX.Element {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const { player, playerEditFunctions } = useEditPlayer();
  const [mode, setMode] = useState(Mode.VIEW);

  useEffect(() => {
    async function initPlayer(): Promise<void> {
      const playerApiResponseFullDto = (await getReturnData(
        `/api/player/${playerId}`
      )) as PlayerApiResponseFullDto;

      setPlayerValues(playerEditFunctions, playerApiResponseFullDto);
    }

    initPlayer();
  }, [playerId]);

  const submitHandlerWrapper = useCallback(
    async function submitHandler(
      event: FormEvent<HTMLFormElement>
    ): Promise<void> {
      event.preventDefault();
      if (playerId === undefined) {
        return;
      }
      if (player.firstName === undefined) {
        return;
      }
      if (player.lastName === undefined) {
        return;
      }

      try {
        const playerToSubmit = new Player(
          Number(playerId),
          player.firstName,
          player.lastName,
          player.age,
          player.height,
          player.weight
        );
        const response = (await putReturnData(
          `/api/player/${playerId}`,
          JSON.stringify(playerToSubmit.convertToPlayerApiRequestSaveDto())
        )) as PlayerApiResponseFullDto;

        setPlayerValues(playerEditFunctions, response);
        setMode(Mode.VIEW);
      } catch (error) {
        if (error instanceof PlaygroundApiError) {
          switch (error.name) {
            case 'AUTHENTICATION_ERROR':
              navigate('/login');
              break;
            default:
          }
        }
      }
    },
    [navigate, player, playerId]
  );

  return (
    <ViewEditBox
      viewComponent={<PlayerDetail player={player} />}
      editComponent={
        <PlayerEdit player={player} playerEditFunctions={playerEditFunctions} />
      }
      mode={mode}
      setMode={setMode}
      submitHandler={submitHandlerWrapper}
    />
  );
}

export default PlayerDetailPage;
