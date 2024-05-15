import { convertPlayerApiResponseFullDtoToPlayer } from "@/player/model/player";
import PlayerGameId from "../player-game-id";
import BasketballBoxScoreApiResponseFullDto from "./basketball-box-score-api-response-full-dto";

interface BasketballBoxScore extends PlayerGameId {
  defensiveRebounds: number | null;

  offensiveRebounds: number | null;

  totalRebounds: number | null;

  assists: number | null;

  steals: number | null;

  blocks: number | null;

  turnovers: number | null;

  personalFouls: number | null;

  points: number | null;

  fieldGoalsMade: number | null;

  fieldGoalsAttempted: number | null;

  fieldGoalPercentage: number | null;

  threePointersMade: number | null;

  threePointersAttempted: number | null;

  threePointerPercentage: number | null;

  twoPointersMade: number | null;

  twoPointersAttempted: number | null;

  twoPointerPercentage: number | null;

  freeThrowsMade: number | null;

  freeThrowsAttempted: number | null;

  freeThrowPercentage: number | null;
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
