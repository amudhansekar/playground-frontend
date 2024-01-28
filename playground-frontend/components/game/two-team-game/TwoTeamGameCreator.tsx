'use client';

import { Input } from '@nextui-org/input';
import { useState } from 'react';

import SportType from '@/common/constants/sport-type';
import { TwoTeamGameTeamPosition } from '@/common/constants/team-constants';
import SubmitButton from '@/components/common/SubmitButton/SubmitButton';
import TeamInstanceCreator from '@/components/team/TeamInstanceCreator';
import {
  sportTypeField,
  startDateField,
} from '@/models/game/base-game/game-fields';
import TeamInstanceInput from '@/models/team/team-instance-input';
import saveGame from '@/server-actions/game/save-game';

interface Props {
  sportType: SportType;
}

function TwoTeamGameCreator(props: Props): JSX.Element {
  const { sportType } = props;
  const [startDate, setStartDate] = useState('');
  const [awayTeam, setAwayTeam] = useState(
    new TeamInstanceInput(undefined, [], undefined, undefined, {
      position: TwoTeamGameTeamPosition.AWAY,
    })
  );
  const [homeTeam, setHomeTeam] = useState(
    new TeamInstanceInput(undefined, [], undefined, undefined, {
      position: TwoTeamGameTeamPosition.HOME,
    })
  );

  function handleStartDate(newStartDate: string) {
    setStartDate(newStartDate);
  }

  return (
    <form action={saveGame}>
      <Input
        type="hidden"
        id={sportTypeField}
        name={sportTypeField}
        value={sportType}
      />
      <Input
        type="hidden"
        id="teamInstanceIds"
        name="teamInstanceIds"
        value="a,b"
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
            id="a"
            teamInstance={awayTeam}
            setTeamInstance={setAwayTeam}
          />
        </div>
        <div className="grid-cols-1 m-auto">
          <h2 className="mt-4 mb-4 text-4xl">Home Team</h2>
          <TeamInstanceCreator
            id="b"
            teamInstance={homeTeam}
            setTeamInstance={setHomeTeam}
          />
        </div>
      </div>
      <SubmitButton text="Submit" disabled={false} />
    </form>
  );
}

export default TwoTeamGameCreator;
