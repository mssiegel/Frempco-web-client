import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StudentChat, SoloChat } from '../../types';

interface CompletedChatsAccordionProps {
  studentChats: (StudentChat | SoloChat)[];
}

const CompletedChatsAccordion =
  ({}: CompletedChatsAccordionProps): JSX.Element => {
    return (
      <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
        >
          <Typography variant='h5' fontWeight={400}>
            Step 4: View Completed Chats
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* Placeholder - Replace with <DisplayOfChats /> */}
          <div>Completed chats will show here</div>
        </AccordionDetails>
      </Accordion>
    );
  };

export default CompletedChatsAccordion;
