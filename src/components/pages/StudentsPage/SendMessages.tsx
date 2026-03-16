/** @jsxImportSource @emotion/react */

import { Box, Fab, Icon } from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import sendMessagesCSS from './SendMessages.css';
import { PAIRED } from '@utils/classrooms';
import { StudentPairedChat, StudentSoloChat } from './index';

interface SendMessagesProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  setPeerIsTyping: Dispatch<SetStateAction<boolean>>;
}

export default function SendMessages({
  socket,
  chat,
  setChat,
  setPeerIsTyping,
}: SendMessagesProps) {
  const typeMessageInput = useRef(null);
  const [message, setMessage] = useState('');

  function sendMessage(e) {
    e.preventDefault();
    if (message) {
      setChat(
        (chat) =>
          ({
            ...chat,
            conversation: [...chat.conversation, ['you', message]],
          } as StudentPairedChat | StudentSoloChat),
      );
      setMessage('');
      typeMessageInput.current.focus();

      if (!socket) return;

      if (chat.mode === PAIRED) {
        socket.emit('student sent message', { message });
      } else {
        setPeerIsTyping(true);
        socket.emit(
          'solo mode: student sent message',
          {
            message,
          },
          ({ chatbotReplyMessages }) => {
            setPeerIsTyping(false);

            if (chatbotReplyMessages && chatbotReplyMessages.length > 0) {
              setChat(
                (chat) =>
                  ({
                    ...chat,
                    conversation: [
                      ...chat.conversation,
                      ...chatbotReplyMessages,
                    ],
                  } as StudentPairedChat | StudentSoloChat),
              );
            }
          },
        );
      }
    }
  }

  function sendUserIsTyping(e) {
    setMessage(e.target.value);
    socket.emit('student typing');
  }

  return (
    <Box>
      <form onSubmit={sendMessage}>
        <Box sx={{ textAlign: 'center' }}>
          <input
            css={sendMessagesCSS.message}
            value={message}
            placeholder={`Talk as ${chat.characters.you}...`}
            maxLength={chat.mode === PAIRED ? 75 : 120}
            onChange={sendUserIsTyping}
            autoFocus
            ref={typeMessageInput}
          />

          <Fab
            size='small'
            type='submit'
            color='primary'
            style={{ marginLeft: '10px' }}
          >
            <Icon sx={{ fontSize: 24 }}>send</Icon>
          </Fab>
        </Box>
      </form>
    </Box>
  );
}
