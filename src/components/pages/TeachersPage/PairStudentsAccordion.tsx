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
import UnpairedStudentsList from './UnpairedStudentsList';

const PairStudentsAccordion = ({
  socket,
  unpairedStudents,
  setUnpairedStudents,
  setStudentChats,
  studentChats,
  characters,
}) => (
  <Accordion disableGutters sx={{ boxShadow: 'none', mb: 3 }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
    >
      <Typography fontFamily='Lora' fontSize='26px'>
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
        <Typography fontFamily='Lora' fontSize='16px'>
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
        studentChats={studentChats}
        characters={characters}
      />
    </AccordionDetails>
  </Accordion>
);

export default PairStudentsAccordion;
