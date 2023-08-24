import { Dispatch, FormEvent, SetStateAction, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import Mode from '../../common/constants/edit-mode';

interface Props {
  viewComponent: JSX.Element;
  editComponent: JSX.Element;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
  submitHandler: (event: FormEvent<HTMLFormElement>) => unknown;
}

function ViewEditBox(props: Props): JSX.Element {
  const { viewComponent, editComponent, mode, setMode, submitHandler } = props;

  const cancelHandler = useCallback(() => setMode(Mode.VIEW), [setMode]);

  return mode === Mode.VIEW ? (
    <>
      <Button onClick={() => setMode(Mode.EDIT)}>Edit</Button>
      {viewComponent}
    </>
  ) : (
    <Box
      component="form"
      onSubmit={submitHandler}
      m="auto"
      sx={{ width: '50%', mt: 1 }}
    >
      <Button onClick={cancelHandler}>Cancel</Button>
      <Button type="submit">Submit</Button>
      {editComponent}
    </Box>
  );
}

export default ViewEditBox;
