import getPlaygroundServerSession from "@/common/auth/get-playground-server-session";
import { getCurrentPlayerFromServer } from "@/common/util/player-util";
import { Button } from "@nextui-org/react";
import { Session } from "next-auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getPlaygroundServerSession();
  return !session ? (
    <UnauthenticatedHomePage />
  ) : (
    <AuthenticatedHomePage session={session} />
  );
}

function UnauthenticatedHomePage() {
  return (
    <div className="flex flex-col items-center justify-between m-24">
      <head>
        <meta name="google-site-verification" content="lxfyxiC4X8w1nHeAUknrizzcANCBMzdBg1nUVd0SdMI">
      </head>
      <h1 className="mb-3 text-2xl font-semibold">Playground</h1>
      <h2 className="mb-3">Track Your Sports Experiences With Friends</h2>
      <Link href="/api/auth/signin">
        <Button color="primary" variant="flat">
          Sign In
        </Button>
      </Link>
    </div>
  );
}

interface Props {
  session: Session;
}
async function AuthenticatedHomePage(props: Props) {
  const { session } = props;
  const player = await getCurrentPlayerFromServer(session);
  return (
    <div className="flex flex-col items-center justify-between m-24">
      <head>
        <meta name="google-site-verification" content="lxfyxiC4X8w1nHeAUknrizzcANCBMzdBg1nUVd0SdMI">
      </head>
      <h1 className="mb-3 text-2xl font-semibold">Playground</h1>
      <h2 className="mb-3">Track Your Sports Experiences With Friends</h2>
      <Link href="/game">
        <Button color="primary" variant="flat" className="mb-3">
          Create Game
        </Button>
      </Link>
      {player === undefined ? (
        <Link href="/player">
          <Button color="primary" variant="flat">
            Create Player
          </Button>
        </Link>
      ) : (
        <Link href={`/player/${player.id}`}>
          <Button color="primary" variant="flat">
            View Upcoming Games
          </Button>
        </Link>
      )}
    </div>
  );
}
