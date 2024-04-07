import { Edge } from "@/common/api/relay";
import GamesTable from "@/game/components/games-table";
import GameApiResponseFullDto from "@/game/model/game-api-response-full-dto";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import PlayerApiResponseFullDto from "../model/player-api-response-full-dto";

interface Props {
  player: PlayerApiResponseFullDto;
  previousGames: Edge<GameApiResponseFullDto>[];
  upcomingGames: Edge<GameApiResponseFullDto>[];
}

function PlayerDetail(props: Props) {
  const { player, previousGames, upcomingGames } = props;

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
      <GamesTable games={previousGames} />

      <h2>Upcoming Games</h2>
      {/* <Table></Table> */}
    </>
  );
}

export default PlayerDetail;
