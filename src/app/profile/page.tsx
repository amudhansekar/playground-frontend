import getPlaygroundServerSession from "@/common/auth/get-playground-server-session";
import { getCurrentPlayerFromServer } from "@/common/util/player-util";
import Link from "next/link";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const session = await getPlaygroundServerSession();
  if (!session) {
    redirect("api/auth/signin");
  }

  const player = await getCurrentPlayerFromServer(session);

  return (
    <div className="flex flex-col items-center justify-between m-24">
      {player === undefined ? (
        <Link href="/player">Create your player</Link>
      ) : (
        <Link href={`/player/${player.id}`}>View your player</Link>
      )}
      <h2>Email Settings</h2>
    </div>
  );
}

export default ProfilePage;
