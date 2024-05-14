"use client";

import { isAuthenticated } from "@/common/auth/auth-util";
import { Button } from "@nextui-org/react";
import { CellValueChangedEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import BasketballBoxScore, {
  convertBasketballBoxScoreApiResponseDtoToBasketballBoxScore,
} from "../model/basketball/basketball-box-score";
import BasketballBoxScoreApiResponseFullDto from "../model/basketball/basketball-box-score-api-response-full-dto";
import PlayerLinkCellRenderer from "./player-link-cell-renderer";

interface Props {
  basketballBoxScoreDtos: BasketballBoxScoreApiResponseFullDto[];
}

function getCellStyle(authenticated: boolean) {
  if (authenticated) {
    return { backgroundColor: "#EBEBE4" };
  }
}

function BasketballBoxScoreTable(props: Props) {
  const { basketballBoxScoreDtos } = props;
  const basketballBoxScores = basketballBoxScoreDtos.map((dto) =>
    convertBasketballBoxScoreApiResponseDtoToBasketballBoxScore(dto)
  );

  const { data: session, status } = useSession();
  const authenticated = isAuthenticated(status);

  const [changedRowIds, setChangedRowIds] = useState<Set<string | undefined>>(
    new Set()
  );
  // Column Definitions: Defines & controls grid columns.
  const colDefs = [
    {
      headerName: "Player",
      field: "player",
      cellDataType: "text",
      cellRenderer: PlayerLinkCellRenderer,
    },
    {
      field: "fieldGoalsMade",
      headerName: "FGM",
      cellDataType: "number",
      cellEditor: "agNumberCellEditor",
      cellStyle: () => {
        return getCellStyle(authenticated);
      },
    },
    {
      field: "fieldGoalsAttempted",
      headerName: "FGA",
      cellDataType: "number",
      cellEditor: "agNumberCellEditor",
      cellStyle: () => {
        return getCellStyle(authenticated);
      },
    },
    {
      field: "fieldGoalPercentage",
      headerName: "FG%",
      cellDataType: "number",
      cellStyle: () => {
        return getCellStyle(authenticated);
      },
    },
    {
      field: "twoPointersMade",
      headerName: "2PM",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "twoPointersAttempted",
      headerName: "2PA",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "twoPointerPercentage",
      headerName: "2P%",
      cellDataType: "number",
      cellStyle: () => {
        return getCellStyle(authenticated);
      },
    },
    {
      field: "threePointersMade",
      headerName: "3PM",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "threePointersAttempted",
      headerName: "3PA",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "threePointerPercentage",
      headerName: "3P%",
      cellDataType: "number",
      cellStyle: () => {
        return getCellStyle(authenticated);
      },
    },
    {
      field: "freeThrowsMade",
      headerName: "FTM",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "freeThrowsAttempted",
      headerName: "FTA",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "freeThrowPercentage",
      headerName: "FT%",
      cellDataType: "number",
      cellStyle: () => {
        return getCellStyle(authenticated);
      },
    },
    {
      field: "offensiveRebounds",
      headerName: "OREB",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "defensiveRebounds",
      headerName: "DREB",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "totalRebounds",
      headerName: "REB",
      cellDataType: "number",
      cellStyle: () => {
        return getCellStyle(authenticated);
      },
    },
    {
      field: "assists",
      headerName: "AST",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "steals",
      headerName: "STL",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "blocks",
      headerName: "BLK",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "turnovers",
      headerName: "TO",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "personalFouls",
      headerName: "FO",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "points",
      headerName: "PTS",
      cellDataType: "number",
      cellStyle: () => {
        return getCellStyle(authenticated);
      },
    },
  ];
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(basketballBoxScores);
  const gridRef = useRef<AgGridReact<BasketballBoxScore>>(null);

  function onCellValueChanged(event: CellValueChangedEvent) {
    setChangedRowIds((prev) => new Set(prev.add(event.node.id)));
  }

  async function saveStatistics() {
    if (changedRowIds.size === 0) {
      return;
    }
    const changedData: BasketballBoxScore[] = [];
    changedRowIds.forEach((rowId) => {
      const row = gridRef.current!.api.getRowNode(rowId!);
      const data = row?.data;
      if (data !== undefined) {
        changedData.push(data);
      }
    });
    const response = await fetch("/api/statistic/basketball/boxscore", {
      method: "PUT",
      body: JSON.stringify(changedData),
    });
    const graphqlResponse = await response.json();
    const boxScores: BasketballBoxScoreApiResponseFullDto[] =
      graphqlResponse.response.data.saveBasketballBoxScores;
    boxScores.forEach((boxScore) => {
      changedRowIds.forEach((rowId) => {
        const row = gridRef.current!.api.getRowNode(rowId!);
        if (row !== undefined) {
          const data = row.data;
          if (data !== undefined && data.player.id === boxScore.player.id) {
            row.updateData(
              convertBasketballBoxScoreApiResponseDtoToBasketballBoxScore(
                boxScore
              )
            );
          }
        }
      });
    });
    setChangedRowIds(new Set());
  }

  // Container: Defines the grid's theme & dimensions.
  return (
    <>
      <div
        className="ag-theme-quartz"
        style={{ width: "90rem", height: "15rem" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
      {authenticated && (
        <Button disabled={changedRowIds.size === 0} onPress={saveStatistics}>
          Save Changes
        </Button>
      )}
    </>
  );
}

export default BasketballBoxScoreTable;
