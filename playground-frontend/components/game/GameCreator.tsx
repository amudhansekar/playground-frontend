'use client';

import SportType from '@/common/constants/sport-type';
import PlaygroundHeader from '@/components/common/Header/PlaygroundHeader';
import GameCreatorFactory from '@/components/game/GameCreatorFactory';
import SportSelector from '@/components/game/SportSelector';
import GameInput from '@/models/game/base-game/game-input';
import { Selection } from '@nextui-org/react';
import { useState } from 'react';

function GameCreator(): JSX.Element {
  const [sport, setSport] = useState<Set<string | number>>(new Set([]));

  function handleSelectionChange(keys: Selection): void {
    if (keys !== 'all') {
      setSport(keys);
    }
  }

  return (
    <div className="grid grid-flow-row gap-y-10">
      <div className="col-span-full m-auto">
        <PlaygroundHeader heading="New Game" />
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
