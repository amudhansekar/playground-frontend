import SportType from '@/common/constants/sport-type';
import { Selection } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';

interface Props {
  sportType: Set<string | number>;
  setSportType: (keys: Selection) => any;
}

function SportSelector(props: Props): JSX.Element {
  const { sportType, setSportType } = props;

  const sportTypes = renderSportTypes();

  return (
    <div>
      <Select
        label="Select a sport"
        selectedKeys={sportType}
        onSelectionChange={setSportType}
        className="max-w-xs"
      >
        {sportTypes}
      </Select>
    </div>
  );
}

function renderSportTypes() {
  let sportTypes = [];
  for (const sportType in SportType) {
    sportTypes.push(
      <SelectItem key={sportType} value={sportType}>
        {sportType}
      </SelectItem>
    );
  }
  return sportTypes;
}

export default SportSelector;
