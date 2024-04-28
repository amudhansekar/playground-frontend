import { GraphQLResponse, query } from "@/common/api/graphql-request";
import {
  Connection,
  Edge,
  convertEdges,
  edgesField,
  endCursorField,
  hasNextPageField,
  hasPreviousPageField,
  nodeField,
  pageInfoField,
  startCursorField,
} from "@/common/api/relay";
import Game, { convertGameApiResponseFullDtoToGame } from "@/game/model/game";
import GameApiResponseFullDto from "@/game/model/game-api-response-full-dto";
import {
  endDateField,
  idField as gameIdField,
  startDateField,
  teamInstancesField,
} from "@/game/model/game-fields";
import PlayerDetail from "@/player/components/player-detail";
import { convertPlayerApiResponseFullDtoToPlayer } from "@/player/model/player";
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
  const player = convertPlayerApiResponseFullDtoToPlayer(response.data.player);
  const previousGames: Connection<Game> = {
    pageInfo: response.data.previousGames.pageInfo,
    edges: convertEdges(
      response.data.previousGames.edges,
      convertGameApiResponseFullDtoToGame
    ),
  };
  const upcomingGames: Connection<Game> = {
    pageInfo: response.data.upcomingGames.pageInfo,
    edges: convertEdges(
      response.data.upcomingGames.edges,
      convertGameApiResponseFullDtoToGame
    ),
  };
  return (
    <>
      <PlayerDetail
        player={player}
        previousGameConnection={previousGames}
        upcomingGameConnection={upcomingGames}
      />
    </>
  );
}

function buildRecentGamesQuery(playerId: number) {
  const playerFilter = {
    field: new EnumType("PLAYER_ID"),
    operator: new EnumType("IN"),
    value: [playerId],
  };

  const gamesBeforeDateFilter = {
    field: new EnumType("END_DATE"),
    operator: new EnumType("LESS_THAN_OR_EQUALS"),
    value: new Date().toISOString(),
  };

  const queryOrder = {
    field: new EnumType("END_DATE"),
    order: new EnumType("DESC"),
  };

  return {
    filters: [playerFilter, gamesBeforeDateFilter],
    order: [queryOrder],
  };
}

function buildUpcomingGamesQuery(playerId: number) {
  const playerFilter = {
    field: new EnumType("PLAYER_ID"),
    operator: new EnumType("IN"),
    value: [playerId],
  };

  const gamesBeforeDateFilter = {
    field: new EnumType("START_DATE"),
    operator: new EnumType("GREATER_THAN_OR_EQUALS"),
    value: new Date().toISOString(),
  };

  const queryOrder = {
    field: new EnumType("END_DATE"),
    order: new EnumType("ASC"),
  };

  return {
    filters: [playerFilter, gamesBeforeDateFilter],
    order: [queryOrder],
  };
}

function convertGameApiEdgesToGameEdges(
  edges: Edge<GameApiResponseFullDto>[]
): Edge<Game>[] {
  return edges.map((edge) => {
    const game = convertGameApiResponseFullDtoToGame(edge.node);
    return {
      cursor: edge.cursor,
      node: game,
    };
  });
}

export default PlayerPage;
