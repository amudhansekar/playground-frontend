import { query } from "@/common/api/graphql-request";
import { GameState } from "@/common/constants/game-constants";
import GameReadEditSwitcher from "@/game/components/game-read-edit-switcher";
import GameStatisticTableFactory from "@/game/components/game-statistic-table-factory";
import GameApiResponseFullDto from "@/game/model/game-api-response-full-dto";
import {
  endDateField,
  idField as gameIdField,
  gameStateField,
  idField,
  livestreamsField,
  sportTypeField,
  startDateField,
  teamInstancesField,
} from "@/game/model/game-fields";
import { endGame } from "@/game/server-action/game-event-actions";
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
import { Button } from "@nextui-org/react";

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
  const gameApiResponseFullDto: GameApiResponseFullDto = gameData.data.game;

  switch (gameApiResponseFullDto.gameState) {
    case GameState.PENDING:
      return PendingGamePage(gameApiResponseFullDto);
    case GameState.LIVE:
      return LiveGamePage(gameApiResponseFullDto);
    case GameState.COMPLETE:
      return CompleteGamePage(gameApiResponseFullDto);
  }
}

function PendingGamePage(gameApiResponseFullDto: GameApiResponseFullDto) {
  return (
    <GameReadEditSwitcher gameApiResponseFullDto={gameApiResponseFullDto} />
  );
}

function LiveGamePage(gameApiResponseFullDto: GameApiResponseFullDto) {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <form action={endGame}>
        <input
          hidden
          id={idField}
          name={idField}
          value={gameApiResponseFullDto.id}
          readOnly
        />
        <Button type="submit">End Game</Button>
      </form>
      <GameStatisticTableFactory
        gameApiResponseFullDto={gameApiResponseFullDto}
      />
    </div>
  );
}

function CompleteGamePage(gameApiResponseFullDto: GameApiResponseFullDto) {
  return (
    <div className="flex flex-col items-center justify-between p-24">
      <GameStatisticTableFactory
        gameApiResponseFullDto={gameApiResponseFullDto}
      />
    </div>
  );
}

export default GamePage;
