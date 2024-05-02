"use server";

import { mutate } from "@/common/api/graphql-request";
import getPlaygroundServerSession from "@/common/auth/get-playground-server-session";
import { getIntFromFormData } from "@/common/util/form-util";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  ageField,
  firstNameField,
  heightField,
  idField,
  lastNameField,
  weightField,
} from "../model/player-fields";

async function savePlayer(formData: FormData) {
  const session = await getPlaygroundServerSession();
  if (!session) {
    redirect("api/auth/signin");
  }

  const playerId = getIntFromFormData(formData, idField);
  const firstName = formData.get(firstNameField);
  const lastName = formData.get(lastNameField);
  const age = getIntFromFormData(formData, ageField);
  const height = getIntFromFormData(formData, heightField);
  const weight = getIntFromFormData(formData, weightField);

  const mutationRequest = {
    savePlayer: {
      __args: {
        input: {
          [idField]: playerId,
          [firstNameField]: firstName,
          [lastNameField]: lastName,
          [ageField]: age,
          [heightField]: height,
          [weightField]: weight,
        },
      },
      [idField]: true,
    },
  };
  const response = await mutate(mutationRequest, {
    Authorization: `Bearer ${session.user.token_set.id_token}`,
  });
  const redirectUrl = `/player/${response.data.savePlayer.id}`;
  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export default savePlayer;
