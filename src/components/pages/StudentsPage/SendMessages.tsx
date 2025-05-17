/** @jsxImportSource @emotion/react */

import { Box, Fab, Typography } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';

import Link from '@components/shared/Link';
import sendMessagesCSS from './SendMessages.css';
import { PAIRED } from '@utils/classrooms';

let peerTypingTimer = null;
export default function SendMessages({
  socket,
  chat,
  setChat,
  chatEndedMsg,
  peerIsTyping,
  setPeerIsTyping,
}) {
  const typeMessageInput = useRef(null);
  const [message, setMessage] = useState('');
  const [wasConnectionLost, setWasConnectionLost] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('peer is typing', () => {
        clearTimeout(peerTypingTimer);
        peerTypingTimer = setTimeout(() => setPeerIsTyping(false), 3000);
        setPeerIsTyping(true);
      });
    }

    return () => {
      if (socket) {
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

      if (!socket) return;

      if (chat.mode === PAIRED) {
        socket.emit(
          'student sent message',
          {
            message,
            chatId: chat.chatId,
          },
          ({ studentNotInPairedChat }) => {
            if (studentNotInPairedChat) {
              studentLostConnection();
            }
          },
        );
      } else {
        setPeerIsTyping(true);
        socket.emit(
          'solo mode: student sent message',
          {
            message,
            chatId: chat.chatId,
          },
          ({ chatbotReplyMessages, studentNotInSoloChat }) => {
            setPeerIsTyping(false);

            if (studentNotInSoloChat) {
              studentLostConnection();
            } else if (
              chatbotReplyMessages &&
              chatbotReplyMessages.length > 0
            ) {
              setChat((chat) => ({
                ...chat,
                conversation: [...chat.conversation, ...chatbotReplyMessages],
              }));
            }
          },
        );
      }
    }
  }

  function studentLostConnection() {
    // If a student's smartphone screen goes dark they will lose connection
    // to the server and will be removed from the server's classroom. When they
    // try sending another message, they will receive an informational message
    // which tells them they need to login again.
    setWasConnectionLost(true);
  }

  function sendUserIsTyping(e) {
    setMessage(e.target.value);
    socket.emit('student typing');
  }

  const peerIsTypingMessage =
    chat.mode === PAIRED
      ? `${chat.characters.peer} is typing...`
      : `chatbot is thinking...`;

  let chatEndedInformationalMessage = null;
  if (wasConnectionLost) {
    chatEndedInformationalMessage = (
      <>
        You were logged out. Return to the{' '}
        <Link href='/'>Frempco homepage</Link> and login again.
      </>
    );
  } else if (chatEndedMsg) {
    chatEndedInformationalMessage = chatEndedMsg;
  }

  return (
    <Box>
      <Typography css={sendMessagesCSS.peerIsTyping}>
        {/* The "&nbsp;" space ensures a consistent layout, preventing the chat
         messages from shifting when the 'peer is typing' indicator appears. */}
        &nbsp;
        {peerIsTyping && peerIsTypingMessage}
      </Typography>

      {!chatEndedInformationalMessage && (
        <form onSubmit={sendMessage}>
          <Typography css={sendMessagesCSS.characterName}>
            {chat.characters.you}
          </Typography>

          <div css={sendMessagesCSS.messageBar}>
            <input
              css={sendMessagesCSS.message}
              value={message}
              placeholder='Say something'
              maxLength={chat.length === PAIRED ? 75 : 120}
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

      {chatEndedInformationalMessage && (
        <Typography css={sendMessagesCSS.chatEndedInfo}>
          {chatEndedInformationalMessage}
        </Typography>
      )}
    </Box>
  );
}
