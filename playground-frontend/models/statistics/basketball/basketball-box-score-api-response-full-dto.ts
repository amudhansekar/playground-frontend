import PlayerGameIdApiResponseFullDto from '../general/player-game-api-response-full-dto';

interface BasketballBoxScoreApiResponseFullDto
  extends PlayerGameIdApiResponseFullDto {
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

export default BasketballBoxScoreApiResponseFullDto;
