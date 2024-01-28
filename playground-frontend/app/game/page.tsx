import getPlaygroundServerSession from '@/common/auth/get-playground-server-session';
import GameCreator from '@/components/game/GameCreator';
import { redirect } from 'next/navigation';

async function NewGamePage(): Promise<JSX.Element> {
  const session = await getPlaygroundServerSession();

  if (!session) {
    redirect('api/auth/signin');
  }

  return <GameCreator />;
}

export default NewGamePage;
