/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { useRef } from 'react';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';

export default function Chatbox({ chat, setChat }) {
  const messageInput = useRef(null);

  function scrollDown() {
    if (messageInput.current)
      messageInput.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <Box css={chatboxCSS.chatboxTop}>
        <Conversation chat={chat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages
          chat={chat}
          setChat={setChat}
          scrollDown={scrollDown}
          messageInput={messageInput}
        />
      </Box>
    </Box>
  );
}
