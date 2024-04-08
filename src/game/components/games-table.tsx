"use client";

import { Connection } from "@/common/api/relay";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { Key } from "react";
import Game from "../model/game";

interface Props {
  gameConnection: Connection<Game>;
}

function GamesTable(props: Props) {
  const { gameConnection } = props;
  const games = gameConnection.edges;

  const columns = [
    {
      key: "date",
      label: "Date Played",
    },
  ];

  const gamesToDisplay = games.map((game) => {
    return {
      key: game.node.id,
      date: game.node.endDate ?? game.node.startDate,
    };
  });

  return (
    <Table aria-label="Example static collection table">
      <TableHeader columns={columns}>
        {(column: { key: Key | null | undefined; label: any }) => (
          <TableColumn key={column.key} align="center">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={gamesToDisplay} emptyContent={"No games"}>
        {(item: { key: Key | null | undefined }) => (
          <TableRow key={item.key}>
            {(columnKey: any) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default GamesTable;
