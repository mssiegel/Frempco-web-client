/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';
import CopyButton from './CopyButton';

export default function Chatbox({ socket, chat, setChat }) {
  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <CopyButton elementId='conversation' />
      <Box css={chatboxCSS.chatboxTop}>
        <Conversation socket={socket} chat={chat} setChat={setChat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages socket={socket} chat={chat} setChat={setChat} />
      </Box>
    </Box>
  );
}
