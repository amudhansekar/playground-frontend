import { Connection } from "@/common/api/relay";
import GamesTable from "@/game/components/games-table";
import Game from "@/game/model/game";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Player from "../model/player";

interface Props {
  player: Player;
  previousGameConnection: Connection<Game>;
  upcomingGameConnection: Connection<Game>;
}

function PlayerDetail(props: Props) {
  const { player, previousGameConnection, upcomingGameConnection } = props;

  return (
    <>
      <Card>
        <CardHeader>
          <p>
            {player.firstName} {player.lastName}
          </p>
          <p>Player ID: {player.id}</p>
        </CardHeader>
        <CardBody>
          <p>Age: {player.age}</p>
          <p>Height: {player.height}</p>
        </CardBody>
      </Card>

      <h1>Previous Games</h1>
      <GamesTable gameConnection={previousGameConnection} />

      <h2>Upcoming Games</h2>
      {/* <Table></Table> */}
    </>
  );
}

export default PlayerDetail;
