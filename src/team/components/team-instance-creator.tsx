import PlayerNameCard from "@/player/components/player-name-card";
import Player from "@/player/model/player";
import { Button, Input } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";
import {
  attributesField,
  descriptionField,
  nameField,
  playerIdsField,
} from "../model/team-instance-fields";
import TeamInstanceInput from "../model/team-instance-input";

interface Props {
  teamInstance: TeamInstanceInput;
  setTeamInstance: Dispatch<SetStateAction<TeamInstanceInput>>;
}

function TeamInstanceCreator(props: Props): JSX.Element {
  const { teamInstance, setTeamInstance } = props;
  const id = teamInstance.id;
  let playerIds = teamInstance.players.map((player) => player.id).toString();

  function setName(name: string) {
    setTeamInstance(
      (teamInstance) =>
        new TeamInstanceInput(
          teamInstance.id,
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
          teamInstance.id,
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
      throw new Error("Player ID is required");
    }

    // first check if the id has been added already
    for (const player of teamInstance.players) {
      if (player.id === Number.parseInt(currentPlayerId)) {
        throw new Error(
          "Player " + currentPlayerId + " has already been added"
        );
      }
    }

    const playerId = parseInt(currentPlayerId);
    const response = await fetch(`/api/player/${playerId}`);
    const graphqlData = await response.json();
    const player = Player.convertFromPlayerApiResponseFullDto(
      graphqlData.response.data.player
    );

    const newPlayerArray = [...teamInstance.players, player];
    setTeamInstance(
      (teamInstance) =>
        new TeamInstanceInput(
          teamInstance.id,
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
          teamInstance.id,
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
        value={teamInstance.name || ""}
        onValueChange={setName}
        isRequired
      />
      <Input
        className="border-3"
        id={`${descriptionField}[${id}]`}
        name={`${descriptionField}[${id}]`}
        label="Description"
        value={teamInstance.description || ""}
        onValueChange={setDescription}
      />
      <Input
        id={`${playerIdsField}[${id}]`}
        name={`${playerIdsField}[${id}]`}
        value={playerIds}
        hidden
      />
      <Input
        id={`${attributesField}[${id}]`}
        name={`${attributesField}[${id}]`}
        value={JSON.stringify(teamInstance.attributes)}
        hidden
      />
      {teamInstance.players.map((player, index) => (
        <div key={index}>
          <PlayerNameCard player={player} />
          <button type="button" onClick={() => handleRemovePlayer(index)}>
            Remove Player
          </button>
        </div>
      ))}
      <Input
        label="Add Player"
        placeholder="Enter the Player ID"
        value={currentPlayerId || ""}
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
