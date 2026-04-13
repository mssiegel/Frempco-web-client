/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import NameInputStep from './NameInputStep';
import PinInputStep from './PinInputStep';

const BUTTON_HEIGHT = 72;

interface LoginFlowProps {
  pin: string;
  setPin: Dispatch<SetStateAction<string>>;
  setStudentName: Dispatch<SetStateAction<string>>;
  isMobile: boolean;
  addStudentToActivity: (studentName: string, pin: string) => void;
}

export default function LoginFlow({
  pin,
  setPin,
  setStudentName,
  isMobile,
  addStudentToActivity,
}: LoginFlowProps): JSX.Element {
  const isPinStep = pin === '';
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
        fontSize: '28px',
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
          isMobile={isMobile}
        />
      ) : (
        <NameInputStep
          setStudentName={setStudentName}
          buttonHeight={BUTTON_HEIGHT}
          inputSx={inputSx}
          pin={pin}
          isMobile={isMobile}
          addStudentToActivity={addStudentToActivity}
        />
      )}
    </Box>
  );
}
