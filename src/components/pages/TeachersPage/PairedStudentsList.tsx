import { Box } from '@mui/material';

import PairedStudentListItem from './PairedStudentListItem';

export default function PairedStudentsList({
  studentChats,
  setDisplayedChat,
  displayedChat,
  setStudentChats,
  setUnpairedStudents,
}) {
  return (
    <Box
      sx={{
        maxWidth: '400px',
        bgcolor: 'white',
        border: '1px solid black',
        p: '5px',
        my: 3,
      }}
    >
      Total paired students:{' '}
      <strong>
        {studentChats.reduce(
          (total, chat) => total + (chat.mode === 'PAIRED' ? 2 : 1),
          0,
        )}
      </strong>
      {/* TODO refactor: since this is a list, the map should be here and not
       in PairedStudentListItem */}
      <PairedStudentListItem
        studentChats={studentChats}
        setDisplayedChat={setDisplayedChat}
        displayedChat={displayedChat}
        setStudentChats={setStudentChats}
        setUnpairedStudents={setUnpairedStudents}
      />
    </Box>
  );
}
