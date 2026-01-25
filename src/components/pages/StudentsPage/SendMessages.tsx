/** @jsxImportSource @emotion/react */

import { Box, Fab, Typography } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

import Link from '@components/shared/Link';
import sendMessagesCSS from './SendMessages.css';
import { PAIRED } from '@utils/classrooms';
import { StudentPairedChat, StudentSoloChat } from './index';
import { ChatMessage, SoloChatMessage } from './index';

interface SendMessagesProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  chatEndedMsg: null | string;
  peerIsTyping: boolean;
  setPeerIsTyping: Dispatch<SetStateAction<boolean>>;
  classroomName: string;
  socketId: string;
}

let peerTypingTimer = null;

export default function SendMessages({
  socket,
  chat,
  setChat,
  chatEndedMsg,
  peerIsTyping,
  setPeerIsTyping,
  classroomName,
  socketId,
}: SendMessagesProps) {
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

  useEffect(() => {
    // If a student's smartphone screen goes dark they will lose connection
    // to the server and will be removed from the server's classroom. When
    // the student reopens the website on their phone browser, they will see
    // a message to login again because of this setInterval().
    if (!classroomName || !socketId) return;

    const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
    const FIFTEEN_SECONDS = 15000;

    const connectionCheckInterval = setInterval(async () => {
      try {
        const getResponse = await fetch(
          `${apiUrl}/classrooms/${classroomName}/studentSockets/${socketId}`,
          { method: 'GET' },
        );
        const { isStudentInsideClassroom } = await getResponse.json();
        if (!isStudentInsideClassroom) {
          setWasConnectionLost(true);
          clearInterval(connectionCheckInterval);
        }
      } catch (error) {
        // If the request fails, assume the connection was lost
        setWasConnectionLost(true);
        clearInterval(connectionCheckInterval);
      }
    }, FIFTEEN_SECONDS);

    return () => clearInterval(connectionCheckInterval);
  }, [classroomName, socketId]);

  function sendMessage(e) {
    e.preventDefault();
    if (message) {
      setChat((chat) => ({
        ...chat,
        conversation: [...chat.conversation, ['you', message] as ChatMessage | SoloChatMessage],
      }) as StudentPairedChat | StudentSoloChat);
      setMessage('');
      typeMessageInput.current.focus();

      if (!socket) return;

      if (chat.mode === PAIRED) {
        socket.emit(
          'student sent message',
          { message },
        );
      } else {
        setPeerIsTyping(true);
        socket.emit(
          'solo mode: student sent message',
          {
            message,
          },
          ({ chatbotReplyMessages }) => {
            setPeerIsTyping(false);

            if (
              chatbotReplyMessages &&
              chatbotReplyMessages.length > 0
            ) {
              setChat((chat) => ({
                ...chat,
                conversation: [...chat.conversation, ...chatbotReplyMessages],
              }) as StudentPairedChat | StudentSoloChat);
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
              maxLength={chat.mode === PAIRED ? 75 : 120}
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
