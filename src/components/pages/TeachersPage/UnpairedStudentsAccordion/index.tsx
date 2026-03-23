import { Dispatch, SetStateAction } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import {
  ErrorOutline as NotificationIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { Socket } from 'socket.io-client';
import { Student, StudentChat, SoloChat } from './types';
import UnpairedStudentsList from './UnpairedStudentsList';

interface UnpairedStudentsAccordionProps {
  socket: Socket;
  unpairedStudents: Student[];
  setUnpairedStudents: Dispatch<SetStateAction<Student[]>>;
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  characters: string[];
}

const UnpairedStudentsAccordion = ({
  socket,
  unpairedStudents,
  setUnpairedStudents,
  setStudentChats,
  characters,
}: UnpairedStudentsAccordionProps) => (
  <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
    >
      <Typography variant='h5' fontWeight={400}>
        Step 2: Pair Your Students ({unpairedStudents.length})
      </Typography>
      <Box
        display='flex'
        alignItems='center'
        gap={1}
        flexGrow={1}
        justifyContent='flex-end'
      >
        {unpairedStudents.length > 0 && <NotificationIcon />}
        <Typography variant='body2'>
          {unpairedStudents.length === 1 ? (
            <>
              There is <strong>1 student</strong> waiting to start
            </>
          ) : (
            <>
              There are <strong>{unpairedStudents.length} students</strong>{' '}
              waiting to start
            </>
          )}
        </Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails>
      <UnpairedStudentsList
        socket={socket}
        unpairedStudents={unpairedStudents}
        setUnpairedStudents={setUnpairedStudents}
        setStudentChats={setStudentChats}
        characters={characters}
      />
    </AccordionDetails>
  </Accordion>
);

export default UnpairedStudentsAccordion;
