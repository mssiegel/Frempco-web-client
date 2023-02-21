import { Grid, Typography } from '@mui/material';

import Chatbox from './Chatbox';

export default function AllStudentChatsDisplay({
  studentChats,
  displayedChat,
  setDisplayedChat,
}) {
  return (
    <Grid
      container
      spacing={2}
      mt={2}
      pb={2}
      sx={{ borderTop: '2px dashed silver' }}
    >
      <Grid item xs={12}>
        <Typography variant='h5' sx={{ color: 'white' }}>
          Click any conversation below to display full chat above
        </Typography>
      </Grid>
      {studentChats.map((chat, i) => {
        const shortenedChat = { ...chat };
        shortenedChat.conversation = [...shortenedChat.conversation].slice(-5);
        return (
          <Grid
            key={i}
            item
            xs={12}
            md={6}
            lg={3}
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => setDisplayedChat(chat.chatId)}
          >
            <Chatbox
              socket={null}
              chat={shortenedChat}
              inAllStudentChatsDisplay={true}
              isTheDisplayedChat={chat.chatId === displayedChat}
              setStudentChats={null}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
