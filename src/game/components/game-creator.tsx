"use client";

import SportType from "@/common/constants/sport-type";
import { Selection } from "@nextui-org/react";
import { useState } from "react";
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
    <div>
      <div>
        <h1>New Game</h1>
      </div>
      <div>
        <SportSelector sportType={sport} setSportType={handleSelectionChange} />
      </div>
      {sport.size !== 0 && (
        <GameCreatorFactory
          gameInput={{
            sportType: sport.values().next().value as unknown as SportType,
            teamInstances: [],
          }}
        />
      )}
    </div>
  );
}

export default GameCreator;
