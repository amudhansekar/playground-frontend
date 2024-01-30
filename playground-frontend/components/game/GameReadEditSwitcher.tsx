'use client';

import Game from '@/models/game/base-game/game';
import GameApiResponseFullDto from '@/models/game/base-game/game-api-response-full-dto';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import PlaygroundHeader from '../common/Header/PlaygroundHeader';
import TwoTeamGameDetail from './TwoTeamGameDetail';

interface Props {
  game: GameApiResponseFullDto;
}

function GameReadEditSwitcher(props: Props) {
  const { game: gameApiResponse } = props;
  const [game, setGame] = useState(
    Game.convertFromGameApiResponsePublicDto(gameApiResponse)
  );
  const [editing, setEditing] = useState(false);

  function toggleEditing() {
    setEditing(!editing);
  }

  return (
    <div className="grid grid-flow-row gap-y-10">
      <div className="col-span-full m-auto">
        <PlaygroundHeader
          heading="
        Game"
        />
      </div>
      <Button onPress={toggleEditing}>{editing ? 'Cancel' : 'Edit'}</Button>
      <TwoTeamGameDetail game={game} />
    </div>
  );
}

export default GameReadEditSwitcher;
