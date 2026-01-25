/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import { scrollToBottomOfElement } from '@utils/classrooms';
import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';
import CopyButton from '@components/shared/CopyButton';
import { StudentPairedChat, StudentSoloChat } from './index';

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
    <Box css={chatboxCSS.chatboxContainer}>
      <Box sx={{ mb: 1 }}>
        <CopyButton elementId='conversation' />
      </Box>
      <Box css={chatboxCSS.chatboxTop} ref={chatboxConversationContainer}>
        <Conversation chat={chat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages
          socket={socket}
          chat={chat}
          setChat={setChat}
          chatEndedMsg={chatEndedMsg}
          peerIsTyping={peerIsTyping}
          setPeerIsTyping={setPeerIsTyping}
          classroomName={classroomName}
          socketId={socketId}
        />
      </Box>
    </Box>
  );
}
