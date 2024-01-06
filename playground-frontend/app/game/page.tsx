'use client';

import { useState } from 'react';
import SportSelector from '@/components/game/SportSelector';
import { useSession } from 'next-auth/react';
import { Selection } from '@nextui-org/react';
import { Spinner } from '@nextui-org/spinner';
import GameCreatorFactory from '@/components/game/GameCreatorFactory';
import SportType from '@/common/constants/sport-type';
import PlaygroundHeader from '@/components/common/Header/PlaygroundHeader';

function NewGamePage(): JSX.Element {
  const { status } = useSession({ required: true });
  const [sport, setSport] = useState<Set<string | number>>(new Set([]));

  function handleSelectionChange(keys: Selection): void {
    if (keys !== 'all') {
      setSport(keys);
    }
  }

  if (status === 'loading') {
    return <Spinner />;
  } else {
    return (
      <div className="grid grid-flow-row gap-y-10">
        <div className="col-span-full m-auto">
          <PlaygroundHeader heading="New Game" />
        </div>
        <div className="col-span-full m-auto">
          <SportSelector
            sportType={sport}
            setSportType={handleSelectionChange}
          />
        </div>
        {sport.size !== 0 && (
          <GameCreatorFactory
            sportType={sport.values().next().value as unknown as SportType}
          />
        )}
      </div>
    );
  }
}

export default NewGamePage;
