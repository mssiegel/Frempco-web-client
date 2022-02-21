/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { useRef } from 'react';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';

export default function Chatbox({ socket, chat, setChat }) {
  const lastMessage = useRef(null);

  function scrollDown() {
    if (lastMessage.current)
      lastMessage.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <Box css={chatboxCSS.chatboxTop}>
        <Conversation
          socket={socket}
          chat={chat}
          setChat={setChat}
          scrollDown={scrollDown}
          lastMessage={lastMessage}
        />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages
          socket={socket}
          chat={chat}
          setChat={setChat}
          scrollDown={scrollDown}
        />
      </Box>
    </Box>
  );
}
