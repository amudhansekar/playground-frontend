import { GraphQLResponse, query } from "@/common/api/graphql-request";
import { Edge } from "@/common/api/relay";
import { TwoTeamGameTeamPosition } from "@/common/constants/team-constants";
import GameApiResponseFullDto from "@/game/model/game-api-response-full-dto";
import {
  firstNameField,
  idField,
  lastNameField,
} from "@/player/model/player-fields";
import BasketballBoxScoreTable from "@/statistics/components/basketball-box-score-table";
import BasketballBoxScoreApiResponseFullDto from "@/statistics/model/basketball/basketball-box-score-api-response-full-dto";
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
  gameIdsField,
  playerField,
} from "@/statistics/model/statistic-fields";
import TeamInstance from "@/team/model/team-instance";
import { Divider } from "@nextui-org/react";
import Game, {
  convertGameApiResponseFullDtoToGame,
} from "../../game/model/game";

interface Props {
  gameApiResponseFullDto: GameApiResponseFullDto;
}

async function BasketballGameBoxScores(props: Props) {
  const { gameApiResponseFullDto } = props;
  const game = convertGameApiResponseFullDtoToGame(gameApiResponseFullDto);

  const basketballBoxScoreQuery = {
    basketballBoxScores: {
      __args: {
        input: {
          [gameIdsField]: [game.id],
        },
      },
      edges: {
        node: {
          [playerField]: {
            [idField]: true,
            [firstNameField]: true,
            [lastNameField]: true,
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
      },
    },
  };

  const basketballBoxScoreData = await query(basketballBoxScoreQuery);

  const homeTeam = getTeamByPosition(game, TwoTeamGameTeamPosition.HOME);
  const awayTeam = getTeamByPosition(game, TwoTeamGameTeamPosition.AWAY);

  return (
    <div>
      {teamBlock(awayTeam, basketballBoxScoreData)}
      <Divider className="my-5" />
      {teamBlock(homeTeam, basketballBoxScoreData)}
    </div>
  );
}

function getTeamByPosition(game: Game, position: TwoTeamGameTeamPosition) {
  return game.teamInstances.find(
    (teamInstance) => position === teamInstance.attributes.twoTeamGamePosition
  );
}

function teamBlock(
  teamInstance: TeamInstance | undefined,
  basketballBoxScoreData: GraphQLResponse
) {
  if (teamInstance === undefined) {
    return <></>;
  } else {
    const playerIdSet = new Set(
      teamInstance.players.map((player) => player.id)
    );
    const basketballDataForTeam =
      basketballBoxScoreData.data.basketballBoxScores.edges
        .filter((score: Edge<BasketballBoxScoreApiResponseFullDto>) =>
          playerIdSet.has(score.node.player.id)
        )
        .map((score: Edge<BasketballBoxScoreApiResponseFullDto>) => score.node);

    return (
      <div>
        <h2 className="mb-3 text-2xl font-semibold">{teamInstance.name}</h2>
        <p>{teamInstance.description}</p>
        <BasketballBoxScoreTable
          basketballBoxScoreDtos={basketballDataForTeam}
        />
      </div>
    );
  }
}

export default BasketballGameBoxScores;
