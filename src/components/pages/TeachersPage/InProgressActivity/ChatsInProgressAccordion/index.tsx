import { Dispatch, SetStateAction } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StudentChat, SoloChat } from '../../types';
import { PAIRED, SOLO } from '@utils/activities';
import { useSocketConnection } from '@contexts/SocketContext';
import DisplayOfChats from '../shared/DisplayOfChats';

interface ChatsInProgressAccordionProps {
  activeStudentChats: (StudentChat | SoloChat)[];
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
}

const ChatsInProgressAccordion = ({
  activeStudentChats,
  setStudentChats,
}: ChatsInProgressAccordionProps) => {
  const { socket } = useSocketConnection();
  const totalStudents = activeStudentChats.length;
  const pairCount = activeStudentChats.filter(
    (chat) => chat.mode === PAIRED,
  ).length;
  const soloCount = activeStudentChats.filter(
    (chat) => chat.mode === SOLO,
  ).length;

  const verb = pairCount === 1 ? 'is' : 'are';
  const pairText = pairCount === 1 ? 'pair' : 'pairs';
  const soloText = soloCount === 1 ? 'solo student' : 'solo students';

  function endAllChats() {
    const endAllChatsConfirmed = confirm(
      'Are you sure you want to end all the chats?',
    );
    if (!endAllChatsConfirmed) return;

    for (const chat of activeStudentChats) {
      if (chat.mode === SOLO) {
        socket.emit('solo mode: end chat', { chatId: chat.chatId });
      } else {
        const [student1, student2] = chat.studentPair;
        socket.emit('unpair student chat', {
          chatId: chat.chatId,
          student1,
          student2,
        });
      }
    }
    setStudentChats(
      activeStudentChats.map((chat) => ({ ...chat, isCompleted: true })),
    );
  }

  return (
    <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
      >
        <Typography variant='h5' fontWeight={400}>
          Step 3: View Chats In Progress ({totalStudents})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body2'>
          There {verb}{' '}
          <strong>
            {pairCount} student {pairText}
          </strong>{' '}
          and{' '}
          <strong>
            {soloCount} {soloText}
          </strong>
          .
        </Typography>
        <Button
          sx={{ my: 2 }}
          variant='contained'
          size='medium'
          color='error'
          onClick={() => endAllChats()}
        >
          End all chats
        </Button>
        <DisplayOfChats
          studentChats={activeStudentChats}
          setStudentChats={setStudentChats}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ChatsInProgressAccordion;
