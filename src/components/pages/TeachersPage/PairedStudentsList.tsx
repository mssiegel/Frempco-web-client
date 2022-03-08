/** @jsxImportSource @emotion/react */

import {
  Box,
  Button,
  Divider,
  List,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import pairedStudentsCSS from './PairedStudentsList.css';
import conversationCSS from './Conversation.css';

export default function PairedStudentsList({
  studentChats,
  setDisplayedChat,
  displayedChat,
}) {
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
        {studentChats.map(({ chatId, studentPair: [student1, student2] }) => {
          const selected = chatId === displayedChat;
          return (
            <div key={chatId}>
              <Divider />
              <div css={selected && pairedStudentsCSS.selectedChat}>
                <ListItemText
                  inset
                  primary={
                    <>
                      <span css={selected && conversationCSS.student1}>
                        {student1.realName}
                      </span>
                      <span> &amp; </span>
                      <span css={selected && conversationCSS.student2}>
                        {student2.realName}
                      </span>
                    </>
                  }
                />
                <ListItemText
                  inset
                  primary={
                    <Button
                      size='small'
                      onClick={() => setDisplayedChat(chatId)}
                    >
                      Display chat
                    </Button>
                  }
                />
              </div>
            </div>
          );
        })}
      </List>
    </Box>
  );
}
