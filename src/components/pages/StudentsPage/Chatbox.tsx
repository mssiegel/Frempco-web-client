/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';

export default function Chatbox({ chat, setChat }) {
  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <Box css={chatboxCSS.chatboxTop}>
        <Conversation chat={chat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages chat={chat} setChat={setChat} />
      </Box>
    </Box>
  );
}
