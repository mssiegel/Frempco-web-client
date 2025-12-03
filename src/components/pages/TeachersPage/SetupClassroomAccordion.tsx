import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import SetTeacherEmailButton from './SetTeacherEmailButton';
import SetCharacterList from './SetCharacterList';

interface SetupClassroomAccordionProps {
  classroomName: string;
  isActiveClassroom: boolean;
  characters: string[];
  setCharacters: (characters: string[]) => void;
}

const SetupClassroomAccordion = ({
  classroomName,
  isActiveClassroom,
  characters,
  setCharacters,
}: SetupClassroomAccordionProps) => (
  <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
    >
      <Typography fontFamily='Lora' fontSize='26px'>
        Step 1: Setup Your Classroom
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <SetTeacherEmailButton
        classroomName={classroomName}
        isActiveClassroom={isActiveClassroom}
      />
      <SetCharacterList characters={characters} setCharacters={setCharacters} />
    </AccordionDetails>
  </Accordion>
);

export default SetupClassroomAccordion;
