import Player from "@/player/model/player";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";

interface Props {
  player: Player;
}

function PlayerNameCard(props: Props): JSX.Element {
  const { player } = props;
  return (
    <Card className="bg-slate-100	">
      <CardBody>
        <Link href={"/player/" + player.id}>
          {player.firstName + " " + player.lastName}
        </Link>
      </CardBody>
    </Card>
  );
}

export default PlayerNameCard;
