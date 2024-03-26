import Player from "@/player/model/player";
import PlayerGameId from "../player-game-id";
import BasketballBoxScoreApiResponseFullDto from "./basketball-box-score-api-response-full-dto";

class BasketballBoxScore extends PlayerGameId {
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

  constructor(
    player: Player,
    gameId: number,
    defensiveRebounds?: number,
    offensiveRebounds?: number,
    totalRebounds?: number,
    assists?: number,
    steals?: number,
    blocks?: number,
    turnovers?: number,
    personalFouls?: number,
    points?: number,
    fieldGoalsMade?: number,
    fieldGoalsAttempted?: number,
    fieldGoalPercentage?: number,
    threePointersMade?: number,
    threePointersAttempted?: number,
    threePointerPercentage?: number,
    twoPointersMade?: number,
    twoPointersAttempted?: number,
    twoPointerPercentage?: number,
    freeThrowsMade?: number,
    freeThrowsAttempted?: number,
    freeThrowPercentage?: number
  ) {
    super(player, gameId);
    this.defensiveRebounds = defensiveRebounds;
    this.offensiveRebounds = offensiveRebounds;
    this.totalRebounds = totalRebounds;
    this.assists = assists;
    this.steals = steals;
    this.blocks = blocks;
    this.turnovers = turnovers;
    this.personalFouls = personalFouls;
    this.points = points;
    this.fieldGoalsMade = fieldGoalsMade;
    this.fieldGoalsAttempted = fieldGoalsAttempted;
    this.fieldGoalPercentage = fieldGoalPercentage;
    this.threePointersMade = threePointersMade;
    this.threePointersAttempted = threePointersAttempted;
    this.threePointerPercentage = threePointerPercentage;
    this.twoPointersMade = twoPointersMade;
    this.twoPointersAttempted = twoPointersAttempted;
    this.twoPointerPercentage = twoPointerPercentage;
    this.freeThrowsMade = freeThrowsMade;
    this.freeThrowsAttempted = freeThrowsAttempted;
    this.freeThrowPercentage = freeThrowPercentage;
  }

  static convertFromBasketballBoxScoreApiResponseDto(
    dto: BasketballBoxScoreApiResponseFullDto
  ): BasketballBoxScore {
    return new BasketballBoxScore(
      Player.convertFromPlayerApiResponseFullDto(dto.player),
      dto.gameId,
      dto.defensiveRebounds,
      dto.offensiveRebounds,
      dto.totalRebounds,
      dto.assists,
      dto.steals,
      dto.blocks,
      dto.turnovers,
      dto.personalFouls,
      dto.points,
      dto.fieldGoalsMade,
      dto.fieldGoalsAttempted,
      dto.fieldGoalPercentage,
      dto.threePointersMade,
      dto.threePointersAttempted,
      dto.threePointerPercentage,
      dto.twoPointersMade,
      dto.twoPointersAttempted,
      dto.twoPointerPercentage,
      dto.freeThrowsMade,
      dto.freeThrowsAttempted,
      dto.freeThrowPercentage
    );
  }
}

export default BasketballBoxScore;
