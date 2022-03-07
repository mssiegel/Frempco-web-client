/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { useRef } from 'react';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';

export default function Chatbox({ chat }) {
  const parentRef = useRef();
  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <Box css={chatboxCSS.chatboxTop} ref={parentRef}>
        <Conversation chat={chat} parentRef={parentRef} />
      </Box>
    </Box>
  );
}
