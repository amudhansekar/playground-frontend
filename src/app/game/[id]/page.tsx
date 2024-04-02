import { query } from "@/common/api/graphql-request";
import { GameState } from "@/common/constants/game-constants";
import GameReadEditSwitcher from "@/game/components/game-read-edit-switcher";
import GameStatisticTableFactory from "@/game/components/game-statistic-table-factory";
import GameApiResponseFullDto from "@/game/model/game-api-response-full-dto";
import {
  endDateField,
  idField as gameIdField,
  gameStateField,
  livestreamsField,
  sportTypeField,
  startDateField,
  teamInstancesField,
} from "@/game/model/game-fields";
import {
  firstNameField,
  lastNameField,
  idField as playerIdField,
} from "@/player/model/player-fields";
import {
  attributesField,
  descriptionField,
  nameField,
  playersField,
  idField as teamInstanceIdField,
} from "@/team/model/team-instance-fields";

interface Params {
  params: { id: number };
}

async function GamePage({ params }: Params): Promise<JSX.Element> {
  const { id } = params;
  const gameQuery = {
    game: {
      __args: {
        [gameIdField]: id,
      },
      [gameIdField]: true,
      [startDateField]: true,
      [endDateField]: true,
      [sportTypeField]: true,
      [gameStateField]: true,
      [teamInstancesField]: {
        [teamInstanceIdField]: true,
        [nameField]: true,
        [descriptionField]: true,
        [attributesField]: true,
        [playersField]: {
          [playerIdField]: true,
          [firstNameField]: true,
          [lastNameField]: true,
        },
      },
      [livestreamsField]: {
        url: true,
      },
    },
  };

  const gameData = await query(gameQuery);
  const game = gameData.data.game;

  switch (game.gameState) {
    case GameState.PENDING:
      return PendingGamePage(game);
    case GameState.LIVE:
      return LiveGamePage(game);
    case GameState.COMPLETE:
      return CompleteGamePage(game);
    default:
      return PendingGamePage(game);
  }
}

function PendingGamePage(game: GameApiResponseFullDto) {
  return <GameReadEditSwitcher game={game} />;
}

function LiveGamePage(game: GameApiResponseFullDto) {
  return <GameStatisticTableFactory game={game} />;
}

function CompleteGamePage(game: GameApiResponseFullDto) {
  return <p>Hello</p>;
}

export default GamePage;
