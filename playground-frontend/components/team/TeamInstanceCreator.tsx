import { GraphQLResponse, query } from '@/common/api/graphql-request';
import Player from '@/models/player/player';
import {
  ageField,
  firstNameField,
  heightField,
  idField,
  lastNameField,
  weightField,
} from '@/models/player/player-fields';
import {
  descriptionField,
  nameField,
  playerIdsField,
} from '@/models/team/team-instance-fields';
import TeamInstanceInput from '@/models/team/team-instance-input';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Dispatch, SetStateAction, useState } from 'react';
import PlayerCard from '../player/PlayerCard';

interface Props {
  id: string;
  teamInstance: TeamInstanceInput;
  setTeamInstance: Dispatch<SetStateAction<TeamInstanceInput>>;
}

function TeamInstanceCreator(props: Props): JSX.Element {
  const { id, teamInstance, setTeamInstance } = props;
  let playerIds = teamInstance.players.map((player) => player.id).toString();

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

    const playerQuery = {
      player: {
        __args: {
          id: parseInt(currentPlayerId),
        },
        [idField]: true,
        [firstNameField]: true,
        [lastNameField]: true,
        [ageField]: true,
        [heightField]: true,
        [weightField]: true,
      },
    };

    const response: GraphQLResponse = await query(playerQuery);
    const player = Player.convertFromPlayerApiResponseFullDto(
      response.data.player
    );

    const newPlayerArray = [...teamInstance.players, player];
    setTeamInstance(
      (teamInstance) =>
        new TeamInstanceInput(
          teamInstance.name,
          newPlayerArray,
          teamInstance.description,
          teamInstance.teamId,
          teamInstance.attributes
        )
    );

    setCurrentPlayerId(undefined);
    playerIds = newPlayerArray.map((player) => player.id).toString();
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

    playerIds = updatedPlayers.map((player) => player.id).toString();
  }

  return (
    <div>
      <Input
        className="border-3"
        id={`${nameField}[${id}]`}
        name={`${nameField}[${id}]`}
        label="Name"
        value={teamInstance.name || ''}
        onValueChange={setName}
        isRequired
      />
      <Input
        className="border-3"
        id={`${descriptionField}[${id}]`}
        name={`${descriptionField}[${id}]`}
        label="Description"
        value={teamInstance.description || ''}
        onValueChange={setDescription}
      />
      <Input
        id={`${playerIdsField}[${id}]`}
        name={`${playerIdsField}[${id}]`}
        value={playerIds}
        hidden
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
