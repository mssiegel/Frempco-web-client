import { Box } from '@mui/material';
import PairedStudentListItem from './PairedStudentListItem';

export default function PairedStudentsList({
  studentChats,
  setDisplayedChat,
  displayedChat,
  unpair,
}) {
  return (
    <Box
      sx={{
        maxWidth: '400px',
        bgcolor: 'white',
        border: '1px solid black',
        p: '5px',
        pb: '15px',
        my: 3,
      }}
    >
      <span>
        Total paired students: <strong>{studentChats.length * 2}</strong>
      </span>
      <PairedStudentListItem
        studentChats={studentChats}
        setDisplayedChat={setDisplayedChat}
        displayedChat={displayedChat}
        unpair={unpair}
      />
    </Box>
  );
}
