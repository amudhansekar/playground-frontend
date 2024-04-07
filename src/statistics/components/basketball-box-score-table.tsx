"use client";

import { CellValueChangedEvent, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { convertBasketballBoxScoreApiResponseDtoToBasketballBoxScore } from "../model/basketball/basketball-box-score";
import BasketballBoxScoreApiResponseFullDto from "../model/basketball/basketball-box-score-api-response-full-dto";
import PlayerLinkCellRenderer from "./player-link-cell-renderer";

interface Props {
  basketballBoxScoreDtos: BasketballBoxScoreApiResponseFullDto[];
}

function BasketballBoxScoreTable(props: Props) {
  const { basketballBoxScoreDtos } = props;
  const basketballBoxScores = basketballBoxScoreDtos.map((dto) =>
    convertBasketballBoxScoreApiResponseDtoToBasketballBoxScore(dto)
  );

  const { data: session, status } = useSession();
  const authenticated = status === "authenticated";

  const [changedRows, setChangedRows] = useState<any>([]);
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef[]>([
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
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "fieldGoalsAttempted",
      headerName: "FGA",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
    {
      field: "fieldGoalPercentage",
      headerName: "FG%",
      cellDataType: "number",
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
      field: "points",
      headerName: "PTS",
      cellDataType: "number",
      editable: authenticated,
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
      },
    },
  ]);
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(basketballBoxScores);

  function onCellValueChanged(event: CellValueChangedEvent) {
    const data = event.data;
    setChangedRows((oldArray: any) => [...oldArray, data]);
  }

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "1000px", height: "500px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
}

export default BasketballBoxScoreTable;
