"use-client";

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import BasketballBoxScore from "../model/basketball/basketball-box-score";
import BasketballBoxScoreApiResponseFullDto from "../model/basketball/basketball-box-score-api-response-full-dto";

import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme

interface Props {
  basketballBoxScoreDtos: BasketballBoxScoreApiResponseFullDto[];
}

const columns = [
  // {
  //   field: 'player',
  //   headerName: 'Player',
  // },
  { field: "fieldGoalsMade", headerName: "FGM" },
  {
    field: "fieldGoalsAttempted",
    headerName: "FGA",
  },
  {
    field: "fieldGoalPercentage",
    headerName: "FG%",
  },
  {
    field: "twoPointersMade",
    headerName: "2PM",
  },
  {
    field: "twoPointersAttempted",
    headerName: "2PA",
  },
  {
    field: "twoPointerPercentage",
    headerName: "2P%",
  },
  {
    field: "threePointersMade",
    headerName: "3PM",
  },
  {
    field: "threePointersAttempted",
    headerName: "3PA",
  },
  {
    field: "threePointerPercentage",
    headerName: "3P%",
  },
  {
    field: "freeThrowsMade",
    headerName: "FTM",
  },
  {
    field: "freeThrowsAttempted",
    headerName: "FTA",
  },
  {
    field: "freeThrowPercentage",
    headerName: "FT%",
  },
  {
    field: "offensiveRebounds",
    headerName: "OREB",
  },
  {
    field: "defensiveRebounds",
    headerName: "DREB",
  },
  {
    field: "totalRebounds",
    headerName: "REB",
  },
  {
    field: "assists",
    headerName: "AST",
  },
  {
    field: "steals",
    headerName: "STL",
  },
  {
    field: "blocks",
    headerName: "BLK",
  },
  {
    field: "turnovers",
    headerName: "TO",
  },
  { field: "points", headerName: "PTS" },
];

function BasketballBoxScoreTable(props: Props) {
  const { basketballBoxScoreDtos } = props;
  const basketballBoxScores = basketballBoxScoreDtos.map((dto) =>
    BasketballBoxScore.convertFromBasketballBoxScoreApiResponseDto(dto)
  );

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef[]>(columns);

  const [rowData, setRowData] = useState(basketballBoxScores);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}

export default BasketballBoxScoreTable;
