/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { useRef } from 'react';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';

export default function Chatbox({ socket, chat, setChat }) {
  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <Box css={chatboxCSS.chatboxTop}>
        <Conversation socket={socket} chat={chat} setChat={setChat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages socket={socket} chat={chat} setChat={setChat} />
      </Box>
    </Box>
  );
}
