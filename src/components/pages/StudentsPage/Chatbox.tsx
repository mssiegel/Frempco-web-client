/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';

export default function Chatbox({ chat }) {
  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <Box css={chatboxCSS.chatboxTop}>
        <Conversation chat={chat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages />
      </Box>
    </Box>
  );
}
