import { convertPlayerApiResponseFullDtoToPlayer } from "@/player/model/player";
import PlayerGameId from "../player-game-id";
import BasketballBoxScoreApiResponseFullDto from "./basketball-box-score-api-response-full-dto";

interface BasketballBoxScore extends PlayerGameId {
  defensiveRebounds?: number;

  offensiveRebounds?: number;

  totalRebounds?: number;

  assists?: number;

  steals?: number;

  blocks?: number;

  turnovers?: number;

  personalFouls?: number;

  points?: number;

  fieldGoalsMade?: number;

  fieldGoalsAttempted?: number;

  fieldGoalPercentage?: number;

  threePointersMade?: number;

  threePointersAttempted?: number;

  threePointerPercentage?: number;

  twoPointersMade?: number;

  twoPointersAttempted?: number;

  twoPointerPercentage?: number;

  freeThrowsMade?: number;

  freeThrowsAttempted?: number;

  freeThrowPercentage?: number;
}

function convertBasketballBoxScoreApiResponseDtoToBasketballBoxScore(
  dto: BasketballBoxScoreApiResponseFullDto
): BasketballBoxScore {
  return {
    gameId: dto.gameId,
    player: convertPlayerApiResponseFullDtoToPlayer(dto.player),
    defensiveRebounds: dto.defensiveRebounds,
    offensiveRebounds: dto.offensiveRebounds,
    totalRebounds: dto.totalRebounds,
    assists: dto.assists,
    steals: dto.steals,
    blocks: dto.blocks,
    turnovers: dto.turnovers,
    personalFouls: dto.personalFouls,
    points: dto.points,
    fieldGoalsMade: dto.fieldGoalsMade,
    fieldGoalsAttempted: dto.fieldGoalsAttempted,
    fieldGoalPercentage: dto.fieldGoalPercentage,
    threePointersMade: dto.threePointersMade,
    threePointersAttempted: dto.threePointersAttempted,
    threePointerPercentage: dto.threePointerPercentage,
    twoPointersMade: dto.twoPointersMade,
    twoPointersAttempted: dto.twoPointersAttempted,
    twoPointerPercentage: dto.twoPointerPercentage,
    freeThrowsMade: dto.freeThrowsMade,
    freeThrowsAttempted: dto.freeThrowsAttempted,
    freeThrowPercentage: dto.freeThrowPercentage,
  };
}

export default BasketballBoxScore;
export { convertBasketballBoxScoreApiResponseDtoToBasketballBoxScore };
