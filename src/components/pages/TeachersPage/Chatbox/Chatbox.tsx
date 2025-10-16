/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { useRef, useEffect } from 'react';

import { scrollToBottomOfElement } from '@utils/classrooms';
import chatboxCSS from './Chatbox.css';
import Conversation from '../Conversation';
import CopyButton from '@components/shared/CopyButton';
import SendMessages from '../SendMessages';

export default function Chatbox({ socket, chat, setStudentChats }) {
  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [chat.conversation]);

  const chatboxConversationContainer = useRef(null);

  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <CopyButton elementId='displayed-chat' />
      <Box css={chatboxCSS.chatboxTop} ref={chatboxConversationContainer}>
        <Conversation chat={chat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages
          socket={socket}
          chatId={chat.chatId}
          chatMode={chat.mode}
          setStudentChats={setStudentChats}
        />
      </Box>
    </Box>
  );
}

