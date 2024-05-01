import { Connection } from "@/common/api/relay";
import GamesTable from "@/game/components/games-table";
import Game from "@/game/model/game";
import { Card, CardBody, CardHeader, User } from "@nextui-org/react";
import Player from "../model/player";

interface Props {
  player: Player;
  previousGameConnection: Connection<Game>;
  upcomingGameConnection: Connection<Game>;
}

function PlayerDetail(props: Props) {
  const { player, previousGameConnection, upcomingGameConnection } = props;

  return (
    <div className="flex flex-col items-center justify-between p-24">
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

      <h2 className="mb-3 text-2xl font-semibold my-5">Previous Games</h2>
      <GamesTable gameConnection={previousGameConnection} />

      <h2 className="mb-3 text-2xl font-semibold my-5">Upcoming Games</h2>
      <GamesTable gameConnection={upcomingGameConnection} />
    </div>
  );
}

export default PlayerDetail;
