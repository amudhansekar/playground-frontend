import SportType from "@/common/constants/sport-type";
import GameInput from "../model/game-input";
import TwoTeamGameCreator from "./two-team-game-creator";

interface Props {
  gameInput: GameInput;
  toggleEditing?: () => void;
}

function GameCreatorFactory(props: Props): JSX.Element {
  const { gameInput, toggleEditing } = props;

  switch (gameInput.sportType) {
    case SportType.BASKETBALL:
    case SportType.FOOTBALL:
      return (
        <TwoTeamGameCreator
          gameInput={gameInput}
          toggleEditing={toggleEditing}
        />
      );
    default:
      return <div />;
  }
}

export default GameCreatorFactory;
