/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import NameInputStep from './NameInputStep';
import PinInputStep from './PinInputStep';

const BUTTON_HEIGHT = 72;

interface LoginFlowProps {
  pin: number | undefined;
  setPin: React.Dispatch<React.SetStateAction<number | undefined>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginFlow({
  pin,
  setPin,
  setName,
}: LoginFlowProps): JSX.Element {
  const inputSx = {
    width: pin === undefined ? 200 : 350,
    '& .MuiOutlinedInput-root': {
      height: BUTTON_HEIGHT,
      borderRadius: '16px',
      backgroundColor: 'neutrals.white',
      boxShadow: '3px 3px 0 0 rgba(0, 0, 0, 0.25)',
      '& input': {
        p: '12px',
        color: 'neutrals.600',
        textAlign: 'center',
        fontSize: '32px',
      },
      '& fieldset': {
        border: '1px solid silver',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid silver',
      },
      '&:hover fieldset': {
        border: '1px solid silver',
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'neutrals.500',
      opacity: 1,
    },
  };

  return (
    <Box>
      {pin === undefined ? (
        <PinInputStep
          setPin={setPin}
          buttonHeight={BUTTON_HEIGHT}
          inputSx={inputSx}
        />
      ) : (
        <NameInputStep
          setName={setName}
          buttonHeight={BUTTON_HEIGHT}
          inputSx={inputSx}
        />
      )}
    </Box>
  );
}
