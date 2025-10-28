import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const PairStudentsAccordion = () => (
  <Accordion sx={{ boxShadow: 'none' }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      id='pair-students-accordion'
      sx={{
        borderRadius: '15px',
        border: '1px solid #000',
      }}
    >
      <Typography fontFamily='Lora' fontSize='26px'>
        Step 1: Pair Your Students (7)
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography fontFamily='Lora' fontSize='17px'>
        Students are paired up automatically as they enter the classroom, but
        you can adjust pairings by dragging and dropping names.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default PairStudentsAccordion;
