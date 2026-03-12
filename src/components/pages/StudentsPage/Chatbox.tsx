/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import { scrollToBottomOfElement } from '@utils/classrooms';
import chatboxCSS from './Chatbox.css';
import Conversation from './Chatbox/Conversation';
import SendMessages from './SendMessages';
import { StudentPairedChat, StudentSoloChat } from './index';
import Header from './Chatbox/Header';

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
    <Box
      css={chatboxCSS.chatboxContainer}
      sx={{
        boxShadow: '0 20px 24px -4px rgba(10, 13, 18, 0.08)',
        border: '1px dashed silver',
        borderRadius: '12px',
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
            borderRadius: '10px 10px 0 0',
            minHeight: '280px',
            maxHeight: '350px',
            overflowY: 'overlay',
            scrollBehavior: 'smooth',
            mt: '10px',
          }}
        >
          <Conversation
            chat={chat}
            socket={socket}
            peerIsTyping={peerIsTyping}
            setPeerIsTyping={setPeerIsTyping}
          />
        </Box>

        <SendMessages
          socket={socket}
          chat={chat}
          setChat={setChat}
          chatEndedMsg={chatEndedMsg}
          setPeerIsTyping={setPeerIsTyping}
          classroomName={classroomName}
          socketId={socketId}
        />
      </Box>
    </Box>
  );
}
