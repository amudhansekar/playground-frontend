"use client";

import SportType from "@/common/constants/sport-type";
import { Selection } from "@nextui-org/react";
import { useState } from "react";
import GameInput from "../model/game-input";
import GameCreatorFactory from "./game-creator-factory";
import SportSelector from "./sport-selector";

function GameCreator(): JSX.Element {
  const [sport, setSport] = useState<Set<string | number>>(new Set([]));

  function handleSelectionChange(keys: Selection): void {
    if (keys !== "all") {
      setSport(keys);
    }
  }

  return (
    <div className="grid grid-flow-row gap-y-10">
      <div className="col-span-full m-auto">
        <h1>New Game</h1>
      </div>
      <div className="col-span-full m-auto">
        <SportSelector sportType={sport} setSportType={handleSelectionChange} />
      </div>
      {sport.size !== 0 && (
        <GameCreatorFactory
          gameInput={
            new GameInput(sport.values().next().value as unknown as SportType)
          }
        />
      )}
    </div>
  );
}

export default GameCreator;
