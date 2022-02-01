import {
  Box,
  Button,
  Divider,
  List,
  ListItemText,
  ListSubheader,
} from '@mui/material';

export default function PairedStudentsList({ studentChats, setDisplayedChat }) {
  return (
    <Box sx={{ py: 3 }}>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        subheader={
          <ListSubheader>
            Total paired students: {studentChats.length * 2}
          </ListSubheader>
        }
      >
        {studentChats.map(({ chatId, studentPair: [student1, student2] }) => (
          <div key={chatId}>
            <Divider />
            <ListItemText
              inset
              primary={student1.realName + ' & ' + student2.realName}
            />
            <ListItemText
              inset
              primary={
                <Button size='small' onClick={() => setDisplayedChat(chatId)}>
                  Display chat
                </Button>
              }
            />
          </div>
        ))}
      </List>
    </Box>
  );
}
