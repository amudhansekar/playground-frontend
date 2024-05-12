import { Connection } from "@/common/api/relay";
import GamesTable from "@/game/components/games-table";
import GameApiResponseFullDto from "@/game/model/game-api-response-full-dto";
import { Card, CardBody, CardHeader, User } from "@nextui-org/react";
import { convertPlayerApiResponseFullDtoToPlayer } from "../model/player";
import PlayerApiResponseFullDto from "../model/player-api-response-full-dto";

interface Props {
  playerApiResponseFullDto: PlayerApiResponseFullDto;
  previousGameConnection: Connection<GameApiResponseFullDto>;
  upcomingGameConnection: Connection<GameApiResponseFullDto>;
}

function PlayerDetail(props: Props) {
  const {
    playerApiResponseFullDto,
    previousGameConnection,
    upcomingGameConnection,
  } = props;

  const player = convertPlayerApiResponseFullDtoToPlayer(
    playerApiResponseFullDto
  );

  return (
    <div className="flex flex-col items-center justify-between m-24">
      <Card className="max-w-[340px]">
        <CardHeader className="justify-between">
          <User
            name={`${player.firstName} ${player.lastName}`}
            description={`Player ID: ${player.id}`}
            avatarProps={{
              isBordered: true,
              showFallback: true,
            }}
          />
        </CardHeader>
        <CardBody>
          <p>Age: {player.age}</p>
          <p>Height: {player.height}</p>
          <p>Weight: {player.weight}</p>
        </CardBody>
      </Card>
      <div className="mt-8 grid grid-cols-2 gap-x-2 text-center w-full">
        <div>
          <h2 className="mb-3 text-2xl font-semibold my-5">Previous Games</h2>
          <GamesTable gameConnection={previousGameConnection} />
        </div>
        <div>
          <h2 className="mb-3 text-2xl font-semibold my-5">Upcoming Games</h2>
          <GamesTable gameConnection={upcomingGameConnection} />
        </div>
      </div>
    </div>
  );
}

export default PlayerDetail;
