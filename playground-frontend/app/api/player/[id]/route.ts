import { GraphQLResponse, query } from '@/common/api/graphql-request';
import {
  ageField,
  firstNameField,
  heightField,
  idField,
  lastNameField,
  weightField,
} from '@/models/player/player-fields';

/**
 * Queries player data
 * @returns data about a player
 */
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const playerId = params.id;

  const playerQuery = {
    player: {
      __args: {
        id: playerId,
      },
      [idField]: true,
      [firstNameField]: true,
      [lastNameField]: true,
      [ageField]: true,
      [heightField]: true,
      [weightField]: true,
    },
  };

  const response: GraphQLResponse = await query(playerQuery);

  return Response.json({ response });
}
