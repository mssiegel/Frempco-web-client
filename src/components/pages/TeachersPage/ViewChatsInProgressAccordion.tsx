import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StudentChat, SoloChat } from './index';
import { PAIRED, SOLO } from '@utils/classrooms';

interface ViewChatsInProgressAccordionProps {
  studentChats: (StudentChat | SoloChat)[];
}

const ViewChatsInProgressAccordion = ({
  studentChats,
}: ViewChatsInProgressAccordionProps) => {
  const totalStudents = studentChats.length;
  const pairCount = studentChats.filter((chat) => chat.mode === PAIRED).length;
  const soloCount = studentChats.filter((chat) => chat.mode === SOLO).length;

  const verb = pairCount === 1 ? 'is' : 'are';
  const pairText = pairCount === 1 ? 'pair' : 'pairs';
  const soloText = soloCount === 1 ? 'solo chat' : 'solo chats';

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
      <AccordionDetails>
        <Typography fontFamily='Lora' fontSize='16px'>
          There {verb}{' '}
          <strong>
            {pairCount} {pairText} of student chats
          </strong>{' '}
          and{' '}
          <strong>
            {soloCount} {soloText}
          </strong>
          .
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default ViewChatsInProgressAccordion;
