import { Dispatch, SetStateAction } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ErrorOutline as ErrorOutlineIcon,
} from '@mui/icons-material';

import { EMPTY_EMAIL } from '@utils/classrooms';
import SetTeacherEmailButton from './SetTeacherEmailButton';
import SetCharacterList from './SetCharacterList';

interface SetupGameRoomAccordionProps {
  gameRoomPIN: string;
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  wasCharactersUpdated: boolean;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

const SetupGameRoomAccordion = ({
  gameRoomPIN,
  characters,
  setCharacters,
  wasCharactersUpdated,
  email,
  setEmail,
}: SetupGameRoomAccordionProps) => {
  const wasEmailUpdated = email !== EMPTY_EMAIL;
  const hasRemainingSetupOptions = !wasEmailUpdated || !wasCharactersUpdated;

  const remainingSetupOptionsText =
    wasEmailUpdated && wasCharactersUpdated
      ? 'All set up!'
      : !wasEmailUpdated && !wasCharactersUpdated
      ? 'Email and characters have not been set'
      : !wasEmailUpdated
      ? 'Email has not been set'
      : 'Characters have not been set';

  return (
    <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
      >
        <Typography variant='h5' fontWeight={400}>
          Step 1: Setup Your Game Room
        </Typography>
        <Box
          display='flex'
          alignItems='center'
          gap={1}
          flexGrow={1}
          justifyContent='flex-end'
        >
          {hasRemainingSetupOptions && <ErrorOutlineIcon />}
          <Typography variant='body2'>{remainingSetupOptionsText}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <SetCharacterList
          characters={characters}
          setCharacters={setCharacters}
        />
        <SetTeacherEmailButton
          gameRoomPIN={gameRoomPIN}
          email={email}
          setEmail={setEmail}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default SetupGameRoomAccordion;
