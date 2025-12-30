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
}

const SetupClassroomAccordion = ({
  classroomName,
  characters,
  setCharacters,
}: SetupClassroomAccordionProps) => {
  const [email, setEmail] = useState('');

  const missing: string[] = [];
  if (email.trim() === '') missing.push('email');
  if (characters.length === 0) missing.push('characters');

  const statusText =
    missing.length > 0 ? `Not yet set: ${missing.join(', ')}` : 'All set';

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
          {missing.length > 0 && <ErrorOutlineIcon />}
          <Typography fontFamily='Lora' fontSize='16px'>
            {statusText}
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
