/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import CopyButton from '@components/shared/CopyButton';

export default function Chatbox({ chat, showCopyButton }) {
  return (
    <Box css={chatboxCSS.chatboxContainer}>
      {showCopyButton && <CopyButton elementId='displayed-chat' />}
      <Box css={chatboxCSS.chatboxTop}>
        <Conversation chat={chat} />
      </Box>
    </Box>
  );
}
