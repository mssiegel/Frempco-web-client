/** @jsxImportSource @emotion/react */

import { Box, Fab, Typography } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import sendMessagesCSS from './SendMessages.css';

let peerTypingTimer = null;
export default function SendMessages({ socket, chat, setChat }) {
  const typeMessageInput = useRef(null);

  const [message, setMessage] = useState('');
  const [chatEndedMsg, setChatEndedMsg] = useState(null);
  const [peerIsTyping, setPeerIsTyping] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('peer left chat', () => {
        setChatEndedMsg('Your peer left the chat');
      });

      socket.on('teacher ended chat', () => {
        setChatEndedMsg('Your teacher ended your chat');
      });

      socket.on('chat start', () => {
        setChatEndedMsg(null);
      });

      socket.on('student sent message', () => {
        setPeerIsTyping(false);
      });

      socket.on('peer is typing', () => {
        clearTimeout(peerTypingTimer);
        peerTypingTimer = setTimeout(() => setPeerIsTyping(false), 3000);
        setPeerIsTyping(true);
      });
    }

    return () => {
      if (socket) {
        socket.off('peer left chat');
        socket.off('chat start');
        socket.off('student sent message');
        socket.off('peer is typing');
      }
    };
  }, [socket]);

  function sendMessage(e) {
    e.preventDefault();
    if (message) {
      setChat((chat) => ({
        ...chat,
        conversation: [...chat.conversation, ['you', message]],
      }));
      setMessage('');
      typeMessageInput.current.focus();

      if (socket) {
        socket.emit('student sent message', {
          message,
        });
      }
    }
  }

  function sendUserIsTyping(e) {
    setMessage(e.target.value);
    socket.emit('student typing');
  }

  return (
    <Box>
      <Typography css={sendMessagesCSS.peerIsTyping}>
        {/* The "&nbsp;" space ensures a consistent layout, preventing the chat
         messages from shifting when the 'peer is typing' indicator appears. */}
        &nbsp;
        {peerIsTyping && `${chat.characters.peer} is typing...`}
      </Typography>

      {!chatEndedMsg && (
        <form onSubmit={sendMessage}>
          <Typography css={sendMessagesCSS.characterName}>
            {chat.characters.you}
          </Typography>

          <div css={sendMessagesCSS.messageBar}>
            <input
              css={sendMessagesCSS.message}
              value={message}
              placeholder='Say something'
              maxLength={75}
              onChange={sendUserIsTyping}
              autoFocus
              ref={typeMessageInput}
            />

            <Fab
              size='small'
              type='submit'
              color='primary'
              style={{ marginLeft: '10px', background: '#940000' }}
            >
              <SendIcon />
            </Fab>
          </div>
        </form>
      )}
      {chatEndedMsg && (
        <Typography css={sendMessagesCSS.peerLeft}>{chatEndedMsg}</Typography>
      )}
    </Box>
  );
}
