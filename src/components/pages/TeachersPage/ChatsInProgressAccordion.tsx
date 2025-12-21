import { Dispatch, SetStateAction, useContext } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { StudentChat, SoloChat } from './index';
import { PAIRED, SOLO } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import AllStudentChatsDisplay from './AllStudentChatsDisplay';

interface ChatsInProgressAccordionProps {
  studentChats: (StudentChat | SoloChat)[];
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  setUnpairedStudents: Dispatch<SetStateAction<any[]>>;
}

const ChatsInProgressAccordion = ({
  studentChats,
  setStudentChats,
  setUnpairedStudents,
}: ChatsInProgressAccordionProps) => {
  const socket = useContext(SocketContext);
  const totalStudents = studentChats.length;
  const pairCount = studentChats.filter((chat) => chat.mode === PAIRED).length;
  const soloCount = studentChats.filter((chat) => chat.mode === SOLO).length;

  const verb = pairCount === 1 ? 'is' : 'are';
  const pairText = pairCount === 1 ? 'pair' : 'pairs';
  const soloText = soloCount === 1 ? 'solo student' : 'solo students';

  function endAllChats() {
    const endAllChatsConfirmed = confirm(
      'Are you sure you want to end all the chats?',
    );
    if (!endAllChatsConfirmed) return;

    const newUnpairedList = [];

    for (const chat of studentChats) {
      if (chat.mode === SOLO) {
        socket.emit('solo mode: end chat', { chatId: chat.chatId });
        newUnpairedList.push(chat.student);
      } else {
        const [student1, student2] = chat.studentPair;
        socket.emit('unpair student chat', {
          chatId: chat.chatId,
          student1,
          student2,
        });
        newUnpairedList.push(student1, student2);
      }
    }
    setStudentChats([]);

    // We concat the 'newUnpairedList' to 'unpaired' in case a new student
    // joined while this function was running.
    setUnpairedStudents((unpaired) => [...unpaired, ...newUnpairedList]);
  }

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
          color='warning'
          onClick={() => endAllChats()}
        >
          End all chats
        </Button>
        <AllStudentChatsDisplay
          studentChats={studentChats}
          setStudentChats={setStudentChats}
          setUnpairedStudents={setUnpairedStudents}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ChatsInProgressAccordion;
