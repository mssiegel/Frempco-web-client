/** @jsxImportSource @emotion/react */

import { Divider, Button, Box } from '@mui/material';

import conversationCSS from './Conversation.css';

export default function PairedStudentListItem({
  studentChats,
  displayedChat,
  setDisplayedChat,
  unpair,
}) {
  return (
    <>
      {studentChats.map(({ chatId, studentPair: [student1, student2] }) => {
        const selected = chatId === displayedChat;
        return (
          <div key={chatId}>
            <Divider />
            <div>
              <span css={selected && conversationCSS.student1}>
                {student1.realName}
              </span>
              <span> &amp; </span>
              <span css={selected && conversationCSS.student2}>
                {student2.realName}
              </span>
            </div>

            <Box sx={{ minHeight: 40 }}>
              {!selected && (
                <Button
                  size='small'
                  variant='contained'
                  onClick={() => setDisplayedChat(chatId)}
                >
                  Display chat
                </Button>
              )}

              <Button
                sx={{ marginRight: 6, float: 'right' }}
                size='small'
                color='warning'
                onClick={() => unpair(chatId, student1, student2)}
              >
                Unpair
              </Button>
            </Box>
          </div>
        );
      })}
    </>
  );
}
