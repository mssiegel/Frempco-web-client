/** @jsxImportSource @emotion/react */

import { Box, Fab } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';

import sendMessagesCSS from './SendMessages.css';

export default function SendMessages({
  socket,
  chat,
  setChat,
  scrollDown,
  messageInput,
}) {
  const [message, setMessage] = useState('');

  function sendMessage(e) {
    e.preventDefault();
    console.log('sendMessages form submitted!!');
    if (chat.you && message) {
      setChat((chat) => ({
        ...chat,
        conversation: [...chat.conversation, ['you', chat.you, message]],
      }));
      setMessage('');
      scrollDown();
      if (socket) {
        socket.emit('chat message', {
          character: chat.you,
          message,
        });
      }
    }
    messageInput.current.focus();
  }

  useEffect(() => {
    scrollDown();
  }, [chat.conversation]);

  return (
    <Box>
      <form onSubmit={sendMessage}>
        <input
          css={sendMessagesCSS.characterName}
          value={chat.you}
          placeholder='Your character'
          maxLength={30}
          onChange={(e) => setChat({ ...chat, you: e.target.value })}
        />

        <input
          css={sendMessagesCSS.message}
          value={message}
          placeholder='Say something'
          maxLength={75}
          onChange={(e) => setMessage(e.target.value)}
          ref={messageInput}
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
