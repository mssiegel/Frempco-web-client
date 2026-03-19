/** @jsxImportSource @emotion/react */

import { Box, Paper } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import { scrollToBottomOfElement } from '@utils/classrooms';
import { useStudentInClassroom } from '@hooks/useStudentInClassroom';
import Conversation from './Chatbox/Conversation';
import SendMessageSection from './Chatbox/SendMessageSection';
import { StudentPairedChat, StudentSoloChat } from './types';
import Header from './Chatbox/Header';
import ChatEndedSection from './Chatbox/ChatEndedSection';

interface ChatboxProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  chatEndedMsg: null | string;
  classroomName: string;
  socketId: string;
}

export default function Chatbox({
  socket,
  chat,
  setChat,
  chatEndedMsg,
  classroomName,
  socketId,
}: ChatboxProps) {
  const [peerIsTyping, setPeerIsTyping] = useState(false);
  const isConnected = useStudentInClassroom(classroomName, socketId);
  const hasChatEnded = !isConnected || Boolean(chatEndedMsg);

  function addChatMessage(sender, message) {
    setChat((chat) => ({
      ...chat,
      conversation: [...chat.conversation, [sender, message]],
    }));
  }

  useEffect(() => {
    if (socket) {
      socket.on('student sent message', ({ message }) => {
        setPeerIsTyping(false);
        addChatMessage('peer', message);
      });
    }

    return () => {
      if (socket) {
        socket.off('student sent message');
      }
    };
  }, [setChat, socket]);

  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [chat.conversation]);

  const chatboxConversationContainer = useRef(null);

  return (
    <Paper
      elevation={6}
      sx={{
        border: '1px solid silver',
        borderRadius: '12px',
        paddingBottom: '16px',
        backgroundColor: 'white',
        width: '500px',
        '@media (max-width: 500px)': {
          width: '100%',
        },
      }}
    >
      <Header
        yourCharacter={chat.characters.you}
        peerCharacter={chat.characters.peer}
      />
      <Box sx={{ px: '16px' }}>
        <Box
          ref={chatboxConversationContainer}
          sx={{
            minHeight: '280px',
            maxHeight: '350px',
            overflowY: 'overlay',
            scrollBehavior: 'smooth',
            my: '10px',
          }}
        >
          <Conversation
            chat={chat}
            socket={socket}
            peerIsTyping={peerIsTyping}
            setPeerIsTyping={setPeerIsTyping}
          />
        </Box>
      </Box>
      {!hasChatEnded ? (
        <SendMessageSection
          socket={socket}
          chat={chat}
          setChat={setChat}
          setPeerIsTyping={setPeerIsTyping}
        />
      ) : (
        <ChatEndedSection
          isConnected={isConnected}
          chatEndedMsg={chatEndedMsg}
        />
      )}
    </Paper>
  );
}
