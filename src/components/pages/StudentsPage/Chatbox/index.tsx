import { Box, Paper } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import ChatboxHeader from '@components/shared/ChatboxHeader';
import { scrollToBottomOfElement } from '@utils/classrooms';
import { useStudentInClassroom } from '../hooks/useStudentInClassroom';
import Conversation from './Conversation';
import SendMessageSection from './SendMessageSection';
import { StudentPairedChat, StudentSoloChat } from '../types';
import ChatEndedSection from './ChatEndedSection';

interface ChatboxProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  chatEndedMsg: null | string;
  classroomName: string;
  socketId: string;
  isMobile: boolean;
}

export default function Chatbox({
  socket,
  chat,
  setChat,
  chatEndedMsg,
  classroomName,
  socketId,
  isMobile,
}: ChatboxProps) {
  const [peerIsTyping, setPeerIsTyping] = useState(false);
  const isConnected = useStudentInClassroom(classroomName, socketId);
  const hasChatEnded = !isConnected || Boolean(chatEndedMsg);

  function addChatMessage(sender, message: string) {
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
        paddingBottom: '8px',
        backgroundColor: 'white',
        width: '500px',
        '@media (max-width: 500px)': {
          width: '100%',
        },
      }}
    >
      <ChatboxHeader
        characterRows={[
          { label: "You're:", value: chat.characters.you },
          { label: 'With:', value: chat.characters.peer },
        ]}
      />
      <Conversation
        chat={chat}
        socket={socket}
        peerIsTyping={peerIsTyping}
        setPeerIsTyping={setPeerIsTyping}
        containerRef={chatboxConversationContainer}
        isMobile={isMobile}
      />
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
