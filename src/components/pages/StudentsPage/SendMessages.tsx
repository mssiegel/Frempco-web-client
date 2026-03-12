/** @jsxImportSource @emotion/react */

import { Box, Fab, Icon, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

import Link from '@components/shared/Link';
import { useStudentInClassroom } from '@hooks/useStudentInClassroom';
import sendMessagesCSS from './SendMessages.css';
import { PAIRED } from '@utils/classrooms';
import { StudentPairedChat, StudentSoloChat } from './index';

interface SendMessagesProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  chatEndedMsg: null | string;
  setPeerIsTyping: Dispatch<SetStateAction<boolean>>;
  classroomName: string;
  socketId: string;
}

export default function SendMessages({
  socket,
  chat,
  setChat,
  chatEndedMsg,
  setPeerIsTyping,
  classroomName,
  socketId,
}: SendMessagesProps) {
  const typeMessageInput = useRef(null);
  const [message, setMessage] = useState('');
  const isConnected = useStudentInClassroom(classroomName, socketId);

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

  let chatEndedInformationalMessage = null;
  if (!isConnected) {
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
      {!chatEndedInformationalMessage && (
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
      )}

      {chatEndedInformationalMessage && (
        <Typography css={sendMessagesCSS.chatEndedInfo}>
          {chatEndedInformationalMessage}
        </Typography>
      )}
    </Box>
  );
}
