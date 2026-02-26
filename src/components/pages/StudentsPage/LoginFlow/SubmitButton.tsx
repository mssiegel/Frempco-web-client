/** @jsxImportSource @emotion/react */

import { Button, Icon } from '@mui/material';

interface SubmitButtonProps {
  onClick: () => void;
  height: number;
}

export default function SubmitButton({
  onClick,
  height,
}: SubmitButtonProps): JSX.Element {
  return (
    <Button
      onClick={onClick}
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
