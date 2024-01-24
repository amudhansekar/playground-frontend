import authOptions from '@/app/api/auth/[...nextauth]/options';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { Session, getServerSession } from 'next-auth';

/**
 * Provides a wrapper over getServerSession to avoid passing authOptions around
 * Can only be used in server components
 * Taken from https://next-auth.js.org/configuration/nextjs#getserversession
 *
 * @param args args for getServerSession
 * @returns the session or null
 */
async function getPlaygroundServerSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<Session | null> {
  return getServerSession(...args, authOptions);
}

export default getPlaygroundServerSession;
