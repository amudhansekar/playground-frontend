"use server";

import { mutate } from "@/common/api/graphql-request";
import getPlaygroundServerSession from "@/common/auth/get-playground-server-session";
import TeamInstanceApiRequestSaveDto from "@/team/model/team-instance-api-request-save-dto";
import {
  attributesField,
  descriptionField,
  nameField,
  playerIdsField,
  idField as teamInstanceIdField,
} from "@/team/model/team-instance-fields";
import { EnumType } from "json-to-graphql-query";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  idField,
  sportTypeField,
  startDateField,
  teamInstancesField,
} from "../model/game-fields";

async function saveGame(formData: FormData) {
  const session = await getPlaygroundServerSession();
  if (!session) {
    redirect("api/auth/signin");
  }

  const gameId =
    formData.get(idField) === null
      ? null
      : parseInt(formData.get(idField) as string);
  const startDate = new Date(
    formData.get(startDateField) as string
  ).toISOString();
  const sportType = formData.get(sportTypeField) as string;
  const teamInstanceApiRequests = (formData.get("teamInstanceIds") as string)
    .split(",")
    .map((teamId) => buildTeamInstance(formData, teamId));

  const mutationRequest = {
    saveGame: {
      __args: {
        input: {
          [idField]: gameId,
          [sportTypeField]: new EnumType(sportType),
          [startDateField]: startDate,
          [teamInstancesField]: teamInstanceApiRequests,
        },
      },
      [idField]: true,
    },
  };
  const response = await mutate(mutationRequest, {
    Authorization: `Bearer ${session.user.token_set.id_token}`,
  });
  const redirectUrl = `/game/${response.data.saveGame.id}`;
  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

function buildTeamInstance(
  formData: FormData,
  id: string
): TeamInstanceApiRequestSaveDto {
  const name = formData.get(`${nameField}[${id}]`) as string;
  const description = formData.get(`${descriptionField}[${id}]`) as
    | string
    | undefined;
  const playerIds = (formData.get(`${playerIdsField}[${id}]`) as string)
    .split(",")
    .map((playerId) => parseInt(playerId));
  const attributes = JSON.parse(
    formData.get(`${attributesField}[${id}]`) as string
  );

  const parsedId = parseInt(id);
  const teamId = isNaN(parsedId) ? null : parsedId;

  return {
    [teamInstanceIdField]: teamId,
    [nameField]: name,
    [descriptionField]: description,
    [playerIdsField]: playerIds,
    [attributesField]: attributes,
  };
}

export default saveGame;
