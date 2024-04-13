"use client";

import { isAuthenticated } from "@/common/auth/auth-util";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Game from "../model/game";
import { convertGameToGameInput } from "../model/game-input";
import GameCreatorFactory from "./game-creator-factory";
import GameDetailFactory from "./game-detail-factory";

interface Props {
  game: Game;
}

function GameReadEditSwitcher(props: Props) {
  const { game } = props;
  const [editing, setEditing] = useState(false);
  const { data: session, status } = useSession();

  function toggleEditing() {
    setEditing(!editing);
  }

  const gameDisplay = editing ? (
    <GameCreatorFactory gameInput={convertGameToGameInput(game)} />
  ) : (
    <GameDetailFactory game={game} />
  );

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <h1 className="mb-3 text-2xl font-semibold">Game</h1>
      {isAuthenticated(status) && (
        <Button onPress={toggleEditing}>{editing ? "Cancel" : "Edit"}</Button>
      )}
      {gameDisplay}
    </div>
  );
}

export default GameReadEditSwitcher;
