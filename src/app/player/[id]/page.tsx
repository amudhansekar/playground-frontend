import { GraphQLResponse, query } from "@/common/api/graphql-request";
import { edgesField, nodeField } from "@/common/api/relay";
import { endDateField, startDateField } from "@/game/model/game-fields";
import PlayerDetail from "@/player/components/player-detail";
import {
  ageField,
  firstNameField,
  heightField,
  idField,
  lastNameField,
  weightField,
} from "@/player/model/player-fields";
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
      [idField]: true,
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
      [edgesField]: {
        [nodeField]: {
          [idField]: true,
          [endDateField]: true,
        },
      },
    },

    upcomingGames: {
      __aliasFor: "games",
      __args: {
        input: buildUpcomingGamesQuery(id),
      },
      [edgesField]: {
        [nodeField]: {
          [idField]: true,
          [startDateField]: true,
        },
      },
    },
  };

  const response: GraphQLResponse = await query(playerAndPreviousGamesQuery);
  const player = response.data.player;
  const previousGames = response.data.previousGames.edges;
  const upcomingGames = response.data.upcomingGames.edges;
  return (
    <>
      <PlayerDetail
        player={player}
        previousGames={previousGames}
        upcomingGames={upcomingGames}
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

export default PlayerPage;
