import { FormEvent, useState } from 'react';
import SportType from '@/common/constants/sport-type';
import TeamInstanceCreator from '@/components/team/TeamInstanceCreator';
import GameInput from '@/models/game/base-game/game-input';
import TeamInstanceInput from '@/models/team/team-instance-input';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { TwoTeamGameTeamPosition } from '@/common/constants/team-constants';
import { postData } from '@/common/api/request';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GameApiResponseFullDto from '@/models/game/base-game/game-api-response-full-dto';

interface Props {
  sportType: SportType;
}

function TwoTeamGameCreator(props: Props): JSX.Element {
  const { sportType } = props;
  const router = useRouter();
  const { data: session } = useSession({ required: true });
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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const gameInput = new GameInput(sportType, new Date(startDate), [
      awayTeam,
      homeTeam,
    ]);

    try {
      const savedGame: GameApiResponseFullDto = await postData(
        '/api/game',
        JSON.stringify(gameInput.convertToGameApiRequestSaveDto()),
        {
          Authorization: 'Bearer ' + session!.user.token_set.id_token,
          'Content-Type': 'application/json',
        }
      );

      router.push('/game/' + savedGame.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        className="col-span-full max-w-64 m-auto border-3"
        type="date"
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
      <Button type="submit" color="primary" variant="bordered">
        Submit
      </Button>
    </form>
  );
}

export default TwoTeamGameCreator;
