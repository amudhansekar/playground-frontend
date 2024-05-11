import { convertPlayerApiResponseFullDtoToPlayer } from "@/player/model/player";
import {
  ageField,
  firstNameField,
  heightField,
  lastNameField,
  idField as playerIdField,
  weightField,
} from "@/player/model/player-fields";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { ErrorType, GraphQLResponse, query } from "../api/graphql-request";
import getPlaygroundServerSession from "../auth/get-playground-server-session";

/**
 * Gets the player of the current logged-in user
 * Should only be used by the server
 */
async function getCurrentPlayerServer() {
  const session = await getPlaygroundServerSession();
  if (!session) {
    return undefined;
  }

  return getCurrentPlayerFromServer(session);
}

/**
 * Gets the player of the current logged-in user
 * Should only be used by the server
 * Redirects to signin  if user is not signed in
 */
async function getCurrentPlayerServerWithRedirect() {
  const session = await getPlaygroundServerSession();
  if (!session) {
    redirect("api/auth/signin");
  }

  return getCurrentPlayerFromServer(session);
}

async function getCurrentPlayerFromServer(session: Session) {
  const currentPlayerQuery = {
    currentPlayer: {
      [playerIdField]: true,
      [firstNameField]: true,
      [lastNameField]: true,
      [ageField]: true,
      [heightField]: true,
      [weightField]: true,
    },
  };

  const response: GraphQLResponse = await query(currentPlayerQuery, {
    Authorization: `Bearer ${session.user.token_set.id_token}`,
  });

  if (
    response.errors !== undefined &&
    response.errors.length > 0 &&
    response.errors[0].extensions !== null &&
    ErrorType.NOT_FOUND === response.errors[0].extensions.errorType
  ) {
    return undefined;
  }

  return convertPlayerApiResponseFullDtoToPlayer(response.data.currentPlayer);
}

export { getCurrentPlayerServer, getCurrentPlayerServerWithRedirect };
