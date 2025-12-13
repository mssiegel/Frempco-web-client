import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StudentChat, SoloChat } from './index';

interface ViewChatsInProgressAccordionProps {
  studentChats: (StudentChat | SoloChat)[];
}

const ViewChatsInProgressAccordion = ({
  studentChats,
}: ViewChatsInProgressAccordionProps) => {
  const totalStudents = studentChats.length;

  return (
    <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
      >
        <Typography fontFamily='Lora' fontSize='26px'>
          Step 3: View Chats In Progress ({totalStudents})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{/* Content will be added here */}</AccordionDetails>
    </Accordion>
  );
};

export default ViewChatsInProgressAccordion;
