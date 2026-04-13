import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StudentChat, SoloChat } from '../../types';
import DisplayOfChats from '../shared/DisplayOfChats';

interface CompletedChatsAccordionProps {
  studentChats: (StudentChat | SoloChat)[];
}

const CompletedChatsAccordion = ({
  studentChats,
}: CompletedChatsAccordionProps): JSX.Element => {
  const chatCount = studentChats.length;
  const verb = chatCount === 1 ? 'was' : 'were';
  const chatText = chatCount === 1 ? 'chat' : 'chats';

  return (
    <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
      >
        <Typography variant='h5' fontWeight={400}>
          Completed Chats
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2'>
          There {verb}{' '}
          <strong>
            {chatCount} {chatText}
          </strong>{' '}
          completed.
        </Typography>
        <DisplayOfChats studentChats={studentChats} />
      </AccordionDetails>
    </Accordion>
  );
};

export default CompletedChatsAccordion;
