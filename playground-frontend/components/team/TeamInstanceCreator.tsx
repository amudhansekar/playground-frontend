import React, { Dispatch, SetStateAction, useState } from 'react';
import { getData } from '@/common/api/request';
import Player from '@/models/player/player';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import PlayerCard from '../player/PlayerCard';
import TeamInstanceInput from '@/models/team/team-instance-input';

interface Props {
  teamInstance: TeamInstanceInput;
  setTeamInstance: Dispatch<SetStateAction<TeamInstanceInput>>;
}

function TeamInstanceCreator(props: Props): JSX.Element {
  const { teamInstance, setTeamInstance } = props;

  function setName(name: string) {
    setTeamInstance(
      (teamInstance) =>
        new TeamInstanceInput(
          name,
          teamInstance.players,
          teamInstance.description,
          teamInstance.teamId,
          teamInstance.attributes
        )
    );
  }

  function setDescription(description: string) {
    setTeamInstance(
      (teamInstance) =>
        new TeamInstanceInput(
          teamInstance.name,
          teamInstance.players,
          description,
          teamInstance.teamId,
          teamInstance.attributes
        )
    );
  }

  const [currentPlayerId, setCurrentPlayerId] = useState<string | undefined>();

  async function handleAddPlayer() {
    // check that the player id is defined
    if (!currentPlayerId) {
      throw new Error('Player ID is required');
    }

    // first check if the id has been added already
    for (const player of teamInstance.players) {
      if (player.id === Number.parseInt(currentPlayerId)) {
        throw new Error(
          'Player ' + currentPlayerId + ' has already been added'
        );
      }
    }

    const response = await getData('/api/player/' + currentPlayerId);
    const player = Player.convertFromPlayerApiResponseFullDto(response);

    setTeamInstance(
      (teamInstance) =>
        new TeamInstanceInput(
          teamInstance.name,
          [...teamInstance.players, player],
          teamInstance.description,
          teamInstance.teamId,
          teamInstance.attributes
        )
    );

    setCurrentPlayerId(undefined);
  }

  function handleRemovePlayer(index: number) {
    const updatedPlayers = [...teamInstance.players];
    updatedPlayers.splice(index, 1);
    setTeamInstance(
      (teamInstance) =>
        new TeamInstanceInput(
          teamInstance.name,
          updatedPlayers,
          teamInstance.description,
          teamInstance.teamId,
          teamInstance.attributes
        )
    );
  }

  return (
    <div>
      <Input
        className="border-3"
        label="Name"
        value={teamInstance.name || ''}
        onValueChange={setName}
        isRequired
      />
      <Input
        className="border-3"
        label="Description"
        value={teamInstance.description || ''}
        onValueChange={setDescription}
      />
      {teamInstance.players.map((player, index) => (
        <div key={index}>
          <PlayerCard player={player} />
          <button type="button" onClick={() => handleRemovePlayer(index)}>
            Remove Player
          </button>
        </div>
      ))}
      <Input
        label="Add Player"
        placeholder="Enter the Player ID"
        value={currentPlayerId || ''}
        onValueChange={setCurrentPlayerId}
      />
      <Button
        color="primary"
        variant="bordered"
        isDisabled={currentPlayerId === undefined}
        onPress={handleAddPlayer}
      >
        Add Player
      </Button>
    </div>
  );
}

export default TeamInstanceCreator;
