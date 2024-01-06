import Player from '@/models/player/player';
import { Card, CardBody } from '@nextui-org/card';
import { Link } from '@nextui-org/link';
import { User } from '@nextui-org/user';

interface Props {
  player: Player;
}

function PlayerCard(props: Props): JSX.Element {
  const { player } = props;
  return (
    <Card className="bg-slate-100	">
      <CardBody>
        <Link href={'/player/' + player.id}>
          {player.firstName + ' ' + player.lastName}
        </Link>
      </CardBody>
    </Card>
  );
}

export default PlayerCard;
