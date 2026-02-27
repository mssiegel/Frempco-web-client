/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import NameInputStep from './NameInputStep';
import PinInputStep from './PinInputStep';

const BUTTON_HEIGHT = 72;

interface LoginFlowProps {
  pin: number | undefined;
  setPin: React.Dispatch<React.SetStateAction<number | undefined>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isMobile: boolean;
}

export default function LoginFlow({
  pin,
  setPin,
  setName,
  isMobile,
}: LoginFlowProps): JSX.Element {
  const isPinStep = pin === undefined;
  const PIN_INPUT_WIDTH = 200;
  const NAME_INPUT_WIDTH_MOBILE = 250;
  const NAME_INPUT_WIDTH_DESKTOP = 350;
  const input_width = isPinStep
    ? PIN_INPUT_WIDTH
    : isMobile
    ? NAME_INPUT_WIDTH_MOBILE
    : NAME_INPUT_WIDTH_DESKTOP;

  const inputSx = {
    width: input_width,
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
      {isPinStep ? (
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
