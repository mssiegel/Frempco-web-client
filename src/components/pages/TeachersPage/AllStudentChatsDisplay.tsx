import { Grid, Typography } from '@mui/material';

import ReadOnlyChatbox from './Chatbox/ReadOnlyChatbox';

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
        <Typography variant='h5' color='black'>
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
            lg={4}
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => setDisplayedChat(chat.chatId)}
          >
            <ReadOnlyChatbox
              chat={shortenedChat}
              isSelected={chat.chatId === displayedChat}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
