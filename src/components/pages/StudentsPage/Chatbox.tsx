/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';

import { scrollToBottomOfElement } from '@utils/classrooms';
import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';
import CopyButton from '@components/shared/CopyButton';

export default function Chatbox({ socket, chat, setChat }) {
  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [chat.conversation]);

  const chatboxConversationContainer = useRef(null);

  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <CopyButton elementId='conversation' />
      <Box css={chatboxCSS.chatboxTop} ref={chatboxConversationContainer}>
        <Conversation socket={socket} chat={chat} setChat={setChat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages socket={socket} chat={chat} setChat={setChat} />
      </Box>
    </Box>
  );
}
