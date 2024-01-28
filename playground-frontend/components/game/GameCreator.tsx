'use client';

import { useState } from 'react';
import { Selection } from '@nextui-org/react';
import SportType from '@/common/constants/sport-type';
import PlaygroundHeader from '@/components/common/Header/PlaygroundHeader';
import GameCreatorFactory from '@/components/game/GameCreatorFactory';
import SportSelector from '@/components/game/SportSelector';

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
          sportType={sport.values().next().value as unknown as SportType}
        />
      )}
    </div>
  );
}

export default GameCreator;
