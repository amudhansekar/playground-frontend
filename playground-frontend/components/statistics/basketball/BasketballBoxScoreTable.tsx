'use client';

import Player from '@/models/player/player';
import BasketballBoxScore from '@/models/statistics/basketball/basketball-box-score';
import BasketballBoxScoreApiResponseFullDto from '@/models/statistics/basketball/basketball-box-score-api-response-full-dto';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  getKeyValue,
} from '@nextui-org/react';
import { Key, useCallback } from 'react';

interface Props {
  basketballBoxScoreDtos: BasketballBoxScoreApiResponseFullDto[];
}

const columns = [
  // {
  //   key: 'player',
  //   label: 'Player',
  // },
  { key: 'fieldGoalsMade', label: 'FGM' },
  {
    key: 'fieldGoalsAttempted',
    label: 'FGA',
  },
  {
    key: 'fieldGoalPercentage',
    label: 'FG%',
  },
  {
    key: 'twoPointersMade',
    label: '2PM',
  },
  {
    key: 'twoPointersAttempted',
    label: '2PA',
  },
  {
    key: 'twoPointerPercentage',
    label: '2P%',
  },
  {
    key: 'threePointersMade',
    label: '3PM',
  },
  {
    key: 'threePointersAttempted',
    label: '3PA',
  },
  {
    key: 'threePointerPercentage',
    label: '3P%',
  },
  {
    key: 'freeThrowsMade',
    label: 'FTM',
  },
  {
    key: 'freeThrowsAttempted',
    label: 'FTA',
  },
  {
    key: 'freeThrowPercentage',
    label: 'FT%',
  },
  {
    key: 'offensiveRebounds',
    label: 'OREB',
  },
  {
    key: 'defensiveRebounds',
    label: 'DREB',
  },
  {
    key: 'totalRebounds',
    label: 'REB',
  },
  {
    key: 'assists',
    label: 'AST',
  },
  {
    key: 'steals',
    label: 'STL',
  },
  {
    key: 'blocks',
    label: 'BLK',
  },
  {
    key: 'turnovers',
    label: 'TO',
  },
  { key: 'points', label: 'PTS' },
];

function BasketballBoxScoreTable(props: Props) {
  const { basketballBoxScoreDtos } = props;
  const basketballBoxScores = basketballBoxScoreDtos.map((dto) =>
    BasketballBoxScore.convertFromBasketballBoxScoreApiResponseDto(dto)
  );

  const renderCell = useCallback(
    (stat: { [x: string]: any }, columnKey: string | number) => {
      const cellValue = stat[columnKey];
      switch (columnKey) {
        case 'Player':
          const player: Player = stat.player;
          return (
            <User
              avatarProps={{
                radius: 'lg',
                src: 'https://www.creativefabrica.com/wp-content/uploads/2019/02/One-Cat-Short-Of-Crazy-580x386.jpg',
              }}
              description={player.lastName}
              name={cellValue}
            >
              {player.firstName}
            </User>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table aria-label="Example static collection table">
      <TableHeader columns={columns}>
        {(column: { key: Key | null | undefined; label: any }) => (
          <TableColumn key={column.key} align="center">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={basketballBoxScores}>
        {(item: {
          key: Key | null | undefined;
          gameId: number;
          player: Player;
        }) => (
          <TableRow key={item.gameId + ',' + item.player.id}>
            {(columnKey: any) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default BasketballBoxScoreTable;
