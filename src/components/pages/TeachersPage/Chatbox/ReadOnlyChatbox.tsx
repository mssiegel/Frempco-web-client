/** @jsxImportSource @emotion/react */

import { Box, Button } from '@mui/material';
import { useRef, useEffect } from 'react';

import { scrollToBottomOfElement } from '@utils/classrooms';
import chatboxCSS from './Chatbox.css';
import Conversation from '../Conversation';

export default function ReadOnlyChatbox({ chat, isSelected }) {
  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [chat.conversation]);

  const chatboxConversationContainer = useRef(null);

  return (
    <Box
      css={chatboxCSS.chatboxContainer && chatboxCSS.readOnlyChatboxWrapper}
      border={isSelected ? '3px solid royalblue' : ''}
    >
      <Box css={chatboxCSS.chatboxTop} ref={chatboxConversationContainer}>
        <Conversation chat={chat} />
      </Box>
      <Box css={chatboxCSS.endChatContainer}>
        <Button size='medium' color='warning' variant='contained'>
          End Chat
        </Button>
      </Box>
    </Box>
  );
}
