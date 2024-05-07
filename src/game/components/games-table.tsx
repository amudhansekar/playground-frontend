"use client";

import { Connection, Edge } from "@/common/api/relay";
import { GameState } from "@/common/constants/game-constants";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Link from "next/link";
import { Key, useCallback } from "react";
import Game from "../model/game";

interface Props {
  gameConnection: Connection<Game>;
}

function GamesTable(props: Props) {
  const { gameConnection } = props;
  const gameEdges = gameConnection.edges;

  const columns = [
    {
      key: "sportType",
      label: "Sport Type",
    },
    {
      key: "gameState",
      label: "Status",
    },
    {
      key: "date",
      label: "Date Played",
    },
    {
      key: "score",
      label: "Score",
    },
  ];

  const renderCell = useCallback((gameEdge: Edge<Game>, columnKey: Key) => {
    const game = gameEdge.node;
    switch (columnKey) {
      case "sportType":
        return game.sportType;
      case "gameState":
        return game.gameState;
      case "date":
        const dateObject = game.endDate ?? game.startDate;
        return (
          <Link href={`/game/${game.id}`}>{dateObject.toDateString()}</Link>
        );
      case "score":
        if (GameState.PENDING === game.gameState) {
          return;
        }
        const namesAndScores = game.teamInstances.map((teamInstance) => {
          return (
            teamInstance.name +
            " " +
            (teamInstance.score === null ? "" : teamInstance.score.score) +
            " "
          );
        });
        return <Link href={`/game/${game.id}`}>{namesAndScores}</Link>;
    }
  }, []);

  return (
    <Table aria-label="Games">
      <TableHeader columns={columns}>
        {(column: { key: Key | null | undefined; label: any }) => (
          <TableColumn key={column.key} align="center">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={gameEdges} emptyContent={"No games"}>
        {(item: Edge<Game>) => (
          <TableRow key={item.node.id}>
            {(columnKey: any) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default GamesTable;
