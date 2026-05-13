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

import { EMPTY_EMAIL } from '@utils/activities';
import SetTeacherEmailButton from './SetTeacherEmailButton';
import SetCharacterList from './SetCharacterList';

interface SetupActivityAccordionProps {
  activityPin: string;
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

const SetupActivityAccordion = ({
  activityPin,
  characters,
  setCharacters,
  email,
  setEmail,
}: SetupActivityAccordionProps) => {
  const wasEmailUpdated = email !== EMPTY_EMAIL;
  const hasRemainingSetupOptions = !wasEmailUpdated;

  const remainingSetupOptionsText =
    wasEmailUpdated
      ? 'All set up!'
      : 'Email has not been set';

  return (
    <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
      >
        <Typography variant='h5' fontWeight={400}>
          Step 1: Set Up Your Activity
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
          activityPin={activityPin}
          email={email}
          setEmail={setEmail}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default SetupActivityAccordion;
