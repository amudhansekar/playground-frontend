"use client";

import { isAuthenticated } from "@/common/auth/auth-util";
import SubmitButton from "@/common/components/submit-button/submit-button";
import { Button, DateInput } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Game, { convertGameApiResponseFullDtoToGame } from "../model/game";
import GameApiResponseFullDto from "../model/game-api-response-full-dto";
import { idField } from "../model/game-fields";
import { convertGameToGameInput } from "../model/game-input";
import { startGame } from "../server-action/game-event-actions";
import GameCreatorFactory from "./game-creator-factory";
import GameDetailFactory from "./game-detail-factory";

interface Props {
  gameApiResponseFullDto: GameApiResponseFullDto;
}

function GameReadEditSwitcher(props: Props): JSX.Element {
  const { gameApiResponseFullDto } = props;
  const game = convertGameApiResponseFullDtoToGame(gameApiResponseFullDto);
  const [editing, setEditing] = useState(false);
  const { data: session, status } = useSession();

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <div className="flex flex-col items-center justify-between m-24">
      <h1 className="mb-3 text-2xl font-semibold">Game</h1>
      {renderGameDisplay(game, isAuthenticated(status), editing, toggleEditing)}
    </div>
  );
}

function renderGameDisplay(
  game: Game,
  isAuthenticated: boolean,
  editing: boolean,
  toggleEditing: () => void
): JSX.Element {
  if (!isAuthenticated) {
    return <GameDetailFactory game={game} />;
  } else if (editing) {
    return (
      <>
        <Button onPress={toggleEditing}>Cancel</Button>
        <GameCreatorFactory gameInput={convertGameToGameInput(game)} />
      </>
    );
  } else {
    return (
      <>
        <form action={startGame}>
          <input hidden id={idField} name={idField} value={game.id} readOnly />
          <SubmitButton text="Start Game" />
        </form>
        <Button onPress={toggleEditing}>Edit</Button>
        <div>
          <DateInput
            label="Start date"
            isReadOnly
            defaultValue={game.startDate}
          />
        </div>
        <GameDetailFactory game={game} />
      </>
    );
  }
}

export default GameReadEditSwitcher;
