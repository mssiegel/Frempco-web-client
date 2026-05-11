import { Dispatch, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Box,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StudentChat, SoloChat } from '../../types';
import { PAIRED, SOLO } from '@utils/activities';
import { useSocketConnection } from '@contexts/SocketContext';
import { CLIENT_EMIT_EVENTS } from '@socket/emitEvents.const';
import DisplayOfChats from '../shared/DisplayOfChats';

interface ChatsInProgressAccordionProps {
  activeStudentChats: (StudentChat | SoloChat)[];
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  markChatAsCompleted: (chat: StudentChat | SoloChat) => void;
  markAllChatsAsCompleted: () => void;
}

const ChatsInProgressAccordion = ({
  activeStudentChats,
  setStudentChats,
  markChatAsCompleted,
  markAllChatsAsCompleted,
}: ChatsInProgressAccordionProps) => {
  const { socket } = useSocketConnection();
  const [shouldRevealStudentRealNames, setShouldRevealStudentRealNames] =
    useState(false);

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
        socket.emit(CLIENT_EMIT_EVENTS.TEACHER_END_SOLO_CHAT, {
          chatId: chat.chatId,
        });
      } else {
        const [student1, student2] = chat.studentPair;
        socket.emit(CLIENT_EMIT_EVENTS.TEACHER_END_PAIRED_CHAT, {
          chatId: chat.chatId,
          student1,
          student2,
        });
      }
    }
    markAllChatsAsCompleted();
  }

  function setRealNameReveal(shouldRevealStudentRealNames: boolean) {
    setShouldRevealStudentRealNames(shouldRevealStudentRealNames);
    socket.emit(CLIENT_EMIT_EVENTS.TEACHER_SET_REAL_NAME_REVEAL, {
      shouldRevealStudentRealNames,
    });
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
        <Box
          sx={{
            mt: 2,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr' },
            alignItems: 'center',
            gap: { xs: 3, md: 4 },
          }}
        >
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={shouldRevealStudentRealNames}
                  onChange={(event) => setRealNameReveal(event.target.checked)}
                />
              }
              label='Reveal real names'
            />
            <Typography variant='body2' color='text.secondary'>
              {shouldRevealStudentRealNames
                ? 'Students can see who they are chatting with.'
                : 'Students only see character names.'}
            </Typography>
          </Box>
          <Button
            variant='contained'
            size='medium'
            color='error'
            onClick={() => endAllChats()}
          >
            End all chats
          </Button>
        </Box>
        <DisplayOfChats
          studentChats={activeStudentChats}
          setStudentChats={setStudentChats}
          onChatCompleted={markChatAsCompleted}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ChatsInProgressAccordion;
