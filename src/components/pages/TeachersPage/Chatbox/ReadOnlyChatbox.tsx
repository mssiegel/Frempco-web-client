/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { useRef, useEffect } from 'react';

import { scrollToBottomOfElement } from '@utils/classrooms';
import chatboxCSS from './Chatbox.css';
import Conversation from '../Conversation';

export default function ReadOnlyChatbox({ chat, isTheDisplayedChat }) {
  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [chat.conversation]);

  const chatboxConversationContainer = useRef(null);

  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <Box
        css={chatboxCSS.chatboxTop}
        border={isTheDisplayedChat ? '3px solid royalblue' : ''}
        ref={chatboxConversationContainer}
      >
        <Conversation chat={chat} />
      </Box>
    </Box>
  );
}
