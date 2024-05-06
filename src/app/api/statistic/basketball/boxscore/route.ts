import { GraphQLResponse, mutate } from "@/common/api/graphql-request";
import getPlaygroundServerSession from "@/common/auth/get-playground-server-session";
import {
  ageField,
  firstNameField,
  heightField,
  idField,
  lastNameField,
  weightField,
} from "@/player/model/player-fields";
import BasketballBoxScore from "@/statistics/model/basketball/basketball-box-score";
import {
  assistsField,
  blocksField,
  defensiveReboundsField,
  fieldGoalPercentageField,
  fieldGoalsAttemptedField,
  fieldGoalsMadeField,
  freeThrowPercentageField,
  freeThrowsAttemptedField,
  freeThrowsMadeField,
  offensiveReboundsField,
  personalFoulsField,
  pointsField,
  stealsField,
  threePointerPercentageField,
  threePointersAttemptedField,
  threePointersMadeField,
  totalReboundsField,
  turnoversField,
  twoPointerPercentageField,
  twoPointersAttemptedField,
  twoPointersMadeField,
} from "@/statistics/model/basketball/basketball-box-score-fields";
import {
  gameIdField,
  playerField,
  playerIdField,
} from "@/statistics/model/statistic-fields";
import { redirect } from "next/navigation";

/**
 * Saves statistics
 * @returns data about a player
 */
export async function PUT(request: Request) {
  const session = await getPlaygroundServerSession();
  if (!session) {
    redirect("api/auth/signin");
  }
  const req: BasketballBoxScore[] = await request.json();

  const mutationRequest = {
    saveBasketballBoxScores: {
      __args: {
        input: req.map((data) => buildSaveBasketballBoxScoreInput(data)),
      },
      [playerField]: {
        [idField]: true,
        [firstNameField]: true,
        [lastNameField]: true,
        [ageField]: true,
        [heightField]: true,
        [weightField]: true,
      },
      [gameIdField]: true,
      [assistsField]: true,
      [blocksField]: true,
      [defensiveReboundsField]: true,
      [fieldGoalPercentageField]: true,
      [fieldGoalsAttemptedField]: true,
      [fieldGoalsMadeField]: true,
      [freeThrowPercentageField]: true,
      [freeThrowsAttemptedField]: true,
      [freeThrowsMadeField]: true,
      [offensiveReboundsField]: true,
      [personalFoulsField]: true,
      [pointsField]: true,
      [stealsField]: true,
      [threePointerPercentageField]: true,
      [threePointersAttemptedField]: true,
      [threePointersMadeField]: true,
      [totalReboundsField]: true,
      [turnoversField]: true,
      [twoPointerPercentageField]: true,
      [twoPointersAttemptedField]: true,
      [twoPointersMadeField]: true,
    },
  };
  const response: GraphQLResponse = await mutate(mutationRequest, {
    Authorization: `Bearer ${session.user.token_set.id_token}`,
  });

  return Response.json({ response });
}

function buildSaveBasketballBoxScoreInput(
  basketballBoxScore: BasketballBoxScore
) {
  return {
    [playerIdField]: basketballBoxScore.player.id,
    [gameIdField]: basketballBoxScore.gameId,
    [assistsField]: basketballBoxScore.assists,
    [blocksField]: basketballBoxScore.blocks,
    [defensiveReboundsField]: basketballBoxScore.defensiveRebounds,
    [freeThrowsAttemptedField]: basketballBoxScore.freeThrowsAttempted,
    [freeThrowsMadeField]: basketballBoxScore.freeThrowsMade,
    [offensiveReboundsField]: basketballBoxScore.offensiveRebounds,
    [personalFoulsField]: basketballBoxScore.personalFouls,
    [stealsField]: basketballBoxScore.steals,
    [threePointersAttemptedField]: basketballBoxScore.threePointersAttempted,
    [threePointersMadeField]: basketballBoxScore.threePointersMade,
    [turnoversField]: basketballBoxScore.turnovers,
    [twoPointersAttemptedField]: basketballBoxScore.twoPointersAttempted,
    [twoPointersMadeField]: basketballBoxScore.twoPointersMade,
  };
}
