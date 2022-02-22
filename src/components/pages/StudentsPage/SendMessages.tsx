/** @jsxImportSource @emotion/react */

import { Box, Fab, Typography } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { filterWords } from '@utils/classrooms';
import sendMessagesCSS from './SendMessages.css';

let peerTypingTimer = null;
export default function SendMessages({ socket, chat, setChat, scrollDown }) {
  const [message, setMessage] = useState('');
  const [peerHasLeft, setPeerHasLeft] = useState(false);
  const [peerIsTyping, setPeerIsTyping] = useState(false);
  const [peerName, setPeerName] = useState('');

  useEffect(() => {
    if (socket) {
      socket.on('peer has left chat', () => {
        setPeerHasLeft(true);
      });

      socket.on('chat start', () => {
        setPeerHasLeft(false);
      });

      socket.on('chat message', () => {
        setPeerIsTyping(false);
      });

      socket.on('peer is typing', ({ character, message }) => {
        clearTimeout(peerTypingTimer);
        peerTypingTimer = setTimeout(() => {
          setPeerIsTyping(false);
        }, 3000);
        setPeerIsTyping(true);
        setPeerName(character);
      });
    }

    return () => {
      if (socket) {
        socket.off('peer has left chat');
        socket.off('peer is typing');
      }
    };
  });

  function sendMessage(e) {
    e.preventDefault();
    console.log('sendMessages form submitted!!');
    if (chat.you && message) {
      setChat((chat) => ({
        ...chat,
        conversation: [...chat.conversation, ['you', chat.you, message]],
      }));
      setMessage('');

      if (socket) {
        socket.emit('chat message', {
          character: chat.you,
          message,
        });
      }
    }
  }

  function sendUserIsTyping(e) {
    setMessage(e.target.value);
    socket.emit('student typing', {
      character: chat.you,
      message,
    });
  }

  useEffect(() => {
    scrollDown();
  }, [chat.conversation]);

  return (
    <Box>
      <Typography css={sendMessagesCSS.peerIsTyping}>
        &nbsp;
        {peerIsTyping && <span>{filterWords(peerName)} is typing... </span>}
      </Typography>

      {!peerHasLeft && (
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
            onChange={sendUserIsTyping}
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
      )}
      {peerHasLeft && (
        <Typography css={sendMessagesCSS.peerLeft}>
          Your peer left the chat
        </Typography>
      )}
    </Box>
  );
}
