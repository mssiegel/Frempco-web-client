import { Box } from '@mui/material';
import PairedStudentListItem from './PairedStudentListItem';

export default function PairedStudentsList({
  studentChats,
  setDisplayedChat,
  displayedChat,
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
      Total paired students: <strong>{studentChats.length * 2}</strong>
      <PairedStudentListItem
        studentChats={studentChats}
        setDisplayedChat={setDisplayedChat}
        displayedChat={displayedChat}
      />
    </Box>
  );
}
