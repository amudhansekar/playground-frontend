'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/button';

interface Props {
  disabled: boolean | undefined;
  text: string | undefined;
}

function SubmitButton(props: Props): JSX.Element {
  const { disabled = false, text = 'Submit' } = props;
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isDisabled={disabled || pending} isLoading={pending}>
      {text}
    </Button>
  );
}

export default SubmitButton;
