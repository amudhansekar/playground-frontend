import { Link } from "@nextui-org/react";
import { CustomCellRendererProps } from "ag-grid-react";

function PlayerLinkCellRenderer(params: CustomCellRendererProps): JSX.Element {
  const player = params.value;
  const url = `/player/${player.id}`;
  const playerName = player.firstName + " " + player.lastName;
  return <Link href={url}>{playerName}</Link>;
}

export default PlayerLinkCellRenderer;
