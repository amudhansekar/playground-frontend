"use server";

import { mutate } from "@/common/api/graphql-request";
import getPlaygroundServerSession from "@/common/auth/get-playground-server-session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { idField } from "../model/game-fields";

async function startGame(formData: FormData) {
  const session = await getPlaygroundServerSession();
  if (!session) {
    redirect("api/auth/signin");
  }

  const gameId = parseInt(formData.get(idField) as string);
  const mutationRequest = {
    startGame: {
      __args: {
        input: {
          [idField]: gameId,
        },
      },
      success: true,
    },
  };
  await mutate(mutationRequest, {
    Authorization: `Bearer ${session.user.token_set.id_token}`,
  });
  const redirectUrl = `/game/${gameId}`;
  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

async function endGame(formData: FormData) {
  const session = await getPlaygroundServerSession();
  if (!session) {
    redirect("api/auth/signin");
  }

  const gameId = parseInt(formData.get(idField) as string);
  const mutationRequest = {
    endGame: {
      __args: {
        input: {
          [idField]: gameId,
        },
      },
      success: true,
    },
  };
  await mutate(mutationRequest, {
    Authorization: `Bearer ${session.user.token_set.id_token}`,
  });
  const redirectUrl = `/game/${gameId}`;
  revalidatePath(redirectUrl);
  redirect(redirectUrl);
}

export { endGame, startGame };
