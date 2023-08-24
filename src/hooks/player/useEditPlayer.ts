import { useCallback, useState } from 'react';
import IPlayer from '../../models/player/iplayer';

interface PlayerEditFunctions {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setAge: (age: number | undefined) => void;
  setHeight: (height: number | undefined) => void;
  setWeight: (weight: number | undefined) => void;
}

interface UseEditPlayerReturnValues {
  player: IPlayer;
  playerEditFunctions: PlayerEditFunctions;
}

function useEditPlayer(): UseEditPlayerReturnValues {
  const [player, setPlayer] = useState<IPlayer>({});

  const setFirstName = useCallback((firstName: string) => {
    setPlayer((prevPlayer) => {
      return { ...prevPlayer, firstName };
    });
  }, []);

  // function firstNameChangeHandler(firstName: string): void {
  //   setPlayer((prevPlayer) => {
  //     return { ...prevPlayer, firstName };
  //   });
  // }

  const setLastName = useCallback((lastName: string) => {
    setPlayer((prevPlayer) => {
      return { ...prevPlayer, lastName };
    });
  }, []);

  const setAge = useCallback((age: number | undefined) => {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        age: Number.isNaN(age) ? undefined : age,
      };
    });
  }, []);

  const setHeight = useCallback((height: number | undefined) => {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        age: Number.isNaN(height) ? undefined : height,
      };
    });
  }, []);

  const setWeight = useCallback((weight: number | undefined) => {
    setPlayer((prevPlayer) => {
      return {
        ...prevPlayer,
        age: Number.isNaN(weight) ? undefined : weight,
      };
    });
  }, []);

  return {
    player,
    playerEditFunctions: {
      setFirstName,
      setLastName,
      setAge,
      setHeight,
      setWeight,
    },
  };
}

export default useEditPlayer;
export type { PlayerEditFunctions, UseEditPlayerReturnValues };
