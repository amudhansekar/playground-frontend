import Player from "@/player/model/player";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Avatar } from "@nextui-org/react";

interface Props {
  player: Player;
}

function PlayerNameCard(props: Props): JSX.Element {
  const { player } = props;
  return (
    <Card className="bg-slate-100	">
      <CardBody>
        <Avatar
          isBordered
          radius="full"
          size="md"
          showFallback
          href={"/player/" + player.id}
          as={Link}
        />
        <Link href={"/player/" + player.id}>
          {player.firstName + " " + player.lastName}
        </Link>
      </CardBody>
    </Card>
  );
}

export default PlayerNameCard;
