import SubmitButton from "@/common/components/submit-button/submit-button";
import { TwoTeamGameTeamPosition } from "@/common/constants/team-constants";
import { dateToDatetimeLocalInput } from "@/common/util/date-util";
import TeamInstanceCreator from "@/team/components/team-instance-creator";
import TeamInstanceInput from "@/team/model/team-instance-input";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { idField, sportTypeField, startDateField } from "../model/game-fields";
import GameInput from "../model/game-input";
import saveGame from "../server-action/save-game";

interface Props {
  gameInput: GameInput;
}

function TwoTeamGameCreator(props: Props): JSX.Element {
  const { gameInput } = props;
  const [startDate, setStartDate] = useState(
    gameInput.startDate === undefined
      ? undefined
      : dateToDatetimeLocalInput(gameInput.startDate)
  );
  const [awayTeam, setAwayTeam] = useState(
    getTeamByPositionOrNewTeamInstance(
      gameInput,
      TwoTeamGameTeamPosition.AWAY,
      "a"
    )
  );
  const [homeTeam, setHomeTeam] = useState(
    getTeamByPositionOrNewTeamInstance(
      gameInput,
      TwoTeamGameTeamPosition.HOME,
      "b"
    )
  );

  function handleStartDate(newStartDate: string) {
    setStartDate(newStartDate);
  }

  return (
    <form action={saveGame}>
      <Input hidden id={idField} name={idField} value={gameInput.id} />
      <Input
        hidden
        id={sportTypeField}
        name={sportTypeField}
        value={gameInput.sportType}
      />
      <Input
        hidden
        id="teamInstanceIds"
        name="teamInstanceIds"
        value={`${awayTeam.id},${homeTeam.id}`}
      />
      <Input
        className="col-span-full max-w-64 m-auto border-3"
        type="datetime-local"
        id={startDateField}
        name={startDateField}
        label="Start Date"
        value={startDate}
        onValueChange={handleStartDate}
        isRequired
      />
      <div className="grid grid-cols-2">
        <div className="col-span-1 m-auto">
          <h2 className="mt-4 mb-4 text-4xl">Away Team</h2>
          <TeamInstanceCreator
            teamInstance={awayTeam}
            setTeamInstance={setAwayTeam}
          />
        </div>
        <div className="grid-cols-1 m-auto">
          <h2 className="mt-4 mb-4 text-4xl">Home Team</h2>
          <TeamInstanceCreator
            teamInstance={homeTeam}
            setTeamInstance={setHomeTeam}
          />
        </div>
      </div>
      <SubmitButton text="Submit" disabled={false} />
    </form>
  );
}

function getTeamByPositionOrNewTeamInstance(
  gameInput: GameInput,
  position: TwoTeamGameTeamPosition,
  defaultId: string
) {
  const teamInstance = gameInput.teamInstances.find(
    (teamInstance) => teamInstance.attributes.twoTeamGamePosition === position
  );

  if (teamInstance !== undefined) {
    return teamInstance;
  } else {
    return new TeamInstanceInput(
      defaultId,
      undefined,
      [],
      undefined,
      undefined,
      { twoTeamGamePosition: position }
    );
  }
}

export default TwoTeamGameCreator;
