"use client";

import { isAuthenticated } from "@/common/auth/auth-util";
import PlayerNameCard from "@/player/components/player-name-card";
import Player from "@/player/model/player";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Key, useCallback } from "react";

interface Props {
  players: Player[];
  deletePlayer: (playerId: number) => void;
}

function initColumns(status: string): { key: Key; label: any }[] {
  if (isAuthenticated(status)) {
    return [
      { label: "Player", key: "player" },
      { label: "Actions", key: "actions" },
    ];
  } else {
    return [{ label: "Player", key: "player" }];
  }
}

function TeamInstanceTable(props: Props) {
  const { players, deletePlayer } = props;
  const { data: session, status } = useSession();

  const columns = initColumns(status);

  const renderCell = useCallback((player: Player, columnKey: Key) => {
    switch (columnKey) {
      case "player":
        return <PlayerNameCard player={player} />;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Image
              src="/delete-icon.svg"
              alt="Delete Player"
              width={20}
              height={5}
              onClick={() => deletePlayer(player.id)}
            />
          </div>
        );
    }
  }, []);

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column: { key: Key | null | undefined; label: any }) => (
          <TableColumn key={column.key} align="center">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={players}>
        {(item: Player) => (
          <TableRow key={item.id}>
            {(columnKey: any) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TeamInstanceTable;
