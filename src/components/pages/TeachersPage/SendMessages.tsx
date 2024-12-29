/** @jsxImportSource @emotion/react */

import { Box, Fab, Typography } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useState } from 'react';
import sendMessagesCSS from './SendMessages.css';
import { ChatMessage } from '.';

export default function SendMessages({ socket, chatId, setStudentChats }) {
  const [message, setMessage] = useState('');

  function sendMessage(e) {
    e.preventDefault();
    if (message) {
      setStudentChats((studentChats) => {
        return studentChats.map((chat) => {
          if (chat.chatId === chatId) {
            const newMessage: ChatMessage = ['teacher', message];
            return {
              ...chat,
              conversation: [...chat.conversation, newMessage],
            };
          } else return chat;
        });
      });
      setMessage('');

      if (socket) {
        socket.emit('teacher sent message', {
          message,
          chatId,
        });
      }
    }
  }

  return (
    <Box>
      <form onSubmit={sendMessage}>
        <Typography css={sendMessagesCSS.teacherName}>Teacher</Typography>

        <input
          css={sendMessagesCSS.message}
          value={message}
          placeholder='Say something'
          maxLength={75}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus
        />

        <Fab
          size='small'
          type='submit'
          color='primary'
          style={{ marginLeft: '10px', background: '#940000' }}
        >
          <SendIcon />
        </Fab>
      </form>
    </Box>
  );
}
