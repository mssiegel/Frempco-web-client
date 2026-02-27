/** @jsxImportSource @emotion/react */

import { Button, Icon } from '@mui/material';

interface SubmitButtonProps {
  height: number;
}

export default function SubmitButton({
  height,
}: SubmitButtonProps): JSX.Element {
  return (
    <Button
      type='submit'
      sx={{
        padding: '12px',
        height,
        borderRadius: '16px',
        backgroundColor: 'neutrals.white',
        boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.25)',
        border: '1px solid silver',
      }}
    >
      <Icon sx={{ fontSize: 32, color: 'neutrals.600' }}>arrow_right_alt</Icon>
    </Button>
  );
}
