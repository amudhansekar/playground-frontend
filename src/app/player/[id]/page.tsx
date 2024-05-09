import { GraphQLResponse, query } from "@/common/api/graphql-request";
import {
  Connection,
  edgesField,
  endCursorField,
  hasNextPageField,
  hasPreviousPageField,
  nodeField,
  pageInfoField,
  startCursorField,
} from "@/common/api/relay";
import GameApiResponseFullDto from "@/game/model/game-api-response-full-dto";
import {
  endDateField,
  idField as gameIdField,
  gameStateField,
  sportTypeField,
  startDateField,
  teamInstancesField,
} from "@/game/model/game-fields";
import PlayerDetail from "@/player/components/player-detail";
import PlayerApiResponseFullDto from "@/player/model/player-api-response-full-dto";
import {
  ageField,
  firstNameField,
  heightField,
  lastNameField,
  idField as playerIdField,
  weightField,
} from "@/player/model/player-fields";
import {
  nameField,
  playersField,
  scoreField,
  idField as teamInstanceIdField,
} from "@/team/model/team-instance-fields";
import { EnumType } from "json-to-graphql-query";

interface Params {
  params: { id: number };
}

async function PlayerPage({ params }: Params) {
  const { id } = params;

  const playerAndPreviousGamesQuery = {
    player: {
      __args: {
        id: id,
      },
      [playerIdField]: true,
      [firstNameField]: true,
      [lastNameField]: true,
      [ageField]: true,
      [heightField]: true,
      [weightField]: true,
    },

    previousGames: {
      __aliasFor: "games",
      __args: {
        input: buildRecentGamesQuery(id),
      },
      [pageInfoField]: {
        [hasPreviousPageField]: true,
        [hasNextPageField]: true,
        [startCursorField]: true,
        [endCursorField]: true,
      },
      [edgesField]: {
        [nodeField]: {
          [gameIdField]: true,
          [gameStateField]: true,
          [sportTypeField]: true,
          [startDateField]: true,
          [endDateField]: true,
          [teamInstancesField]: {
            [teamInstanceIdField]: true,
            [nameField]: true,
            [scoreField]: true,
            [playersField]: {
              [playerIdField]: true,
              [firstNameField]: true,
              [lastNameField]: true,
            },
          },
        },
      },
    },

    upcomingGames: {
      __aliasFor: "games",
      __args: {
        input: buildUpcomingGamesQuery(id),
      },
      [pageInfoField]: {
        [hasPreviousPageField]: true,
        [hasNextPageField]: true,
        [startCursorField]: true,
        [endCursorField]: true,
      },
      [edgesField]: {
        [nodeField]: {
          [gameIdField]: true,
          [gameStateField]: true,
          [sportTypeField]: true,
          [startDateField]: true,
          [endDateField]: true,
          [teamInstancesField]: {
            [teamInstanceIdField]: true,
            [nameField]: true,
            [scoreField]: true,
            [playersField]: {
              [playerIdField]: true,
              [firstNameField]: true,
              [lastNameField]: true,
            },
          },
        },
      },
    },
  };

  const response: GraphQLResponse = await query(playerAndPreviousGamesQuery);
  const playerApiResponseFullDto: PlayerApiResponseFullDto =
    response.data.player;
  const previousGames: Connection<GameApiResponseFullDto> =
    response.data.previousGames;
  const upcomingGames: Connection<GameApiResponseFullDto> =
    response.data.upcomingGames;
  return (
    <PlayerDetail
      playerApiResponseFullDto={playerApiResponseFullDto}
      previousGameConnection={previousGames}
      upcomingGameConnection={upcomingGames}
    />
  );
}

function buildRecentGamesQuery(playerId: number) {
  const playerFilter = {
    field: new EnumType("PLAYER_ID"),
    operator: new EnumType("IN"),
    value: [playerId],
  };

  const gameStateFilter = {
    field: new EnumType("GAME_STATE"),
    operator: new EnumType("EQUALS"),
    value: "COMPLETE",
  };

  const queryOrder = {
    field: new EnumType("END_DATE"),
    order: new EnumType("DESC"),
  };

  return {
    filters: [playerFilter, gameStateFilter],
    order: [queryOrder],
  };
}

function buildUpcomingGamesQuery(playerId: number) {
  const playerFilter = {
    field: new EnumType("PLAYER_ID"),
    operator: new EnumType("IN"),
    value: [playerId],
  };

  const gameStateFilter = {
    field: new EnumType("GAME_STATE"),
    operator: new EnumType("IN"),
    value: ["PENDING", "LIVE"],
  };

  const queryOrder = {
    field: new EnumType("START_DATE"),
    order: new EnumType("ASC"),
  };

  return {
    filters: [playerFilter, gameStateFilter],
    order: [queryOrder],
  };
}

export default PlayerPage;
