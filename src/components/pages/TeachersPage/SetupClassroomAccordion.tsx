import { Dispatch, SetStateAction, useState } from 'react';
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

import SetTeacherEmailButton from './SetTeacherEmailButton';
import SetCharacterList from './SetCharacterList';

interface SetupClassroomAccordionProps {
  classroomName: string;
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  wasCharactersUpdated: boolean;
}

const EMPTY_EMAIL = '';

const SetupClassroomAccordion = ({
  classroomName,
  characters,
  setCharacters,
  wasCharactersUpdated,
}: SetupClassroomAccordionProps) => {
  const [email, setEmail] = useState(EMPTY_EMAIL);

  const remainingSetupOptions: string[] = [];
  if (email === EMPTY_EMAIL) remainingSetupOptions.push('email');
  if (!wasCharactersUpdated) remainingSetupOptions.push('characters');

  let remainingSetupOptionsText = 'All set up!';

  if (remainingSetupOptions.length === 2) {
  remainingSetupOptionsText = 'Email and characters have not been set';
  } else if (remainingSetupOptions.length === 1) {
    remainingSetupOptionsText =
      remainingSetupOptions[0] === 'email'
        ? 'Email has not been set'
        : 'Characters have not been set';
  }

  return (
    <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
      >
        <Typography fontFamily='Lora' fontSize='26px'>
          Step 1: Setup Your Classroom
        </Typography>
        <Box
          display='flex'
          alignItems='center'
          gap={1}
          flexGrow={1}
          justifyContent='flex-end'
        >
          {remainingSetupOptions.length > 0 && <ErrorOutlineIcon />}
          <Typography fontFamily='Lora' fontSize='16px'>
            {remainingSetupOptionsText}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <SetTeacherEmailButton
          classroomName={classroomName}
          email={email}
          setEmail={setEmail}
        />
        <SetCharacterList characters={characters} setCharacters={setCharacters} />
      </AccordionDetails>
    </Accordion>
  );
};

export default SetupClassroomAccordion;
