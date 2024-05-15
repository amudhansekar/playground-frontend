import PlayerGameIdApiResponseFullDto from "../player-game-api-response-full-dto";

interface BasketballBoxScoreApiResponseFullDto
  extends PlayerGameIdApiResponseFullDto {
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

export default BasketballBoxScoreApiResponseFullDto;
