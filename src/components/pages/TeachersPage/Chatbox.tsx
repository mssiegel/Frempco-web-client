/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import CopyButton from '@components/shared/CopyButton';

export default function Chatbox({
  chat,
  isTheDisplayedChat,
  inAllStudentsChatDisplay,
}) {
  return (
    <Box css={chatboxCSS.chatboxContainer}>
      {!inAllStudentsChatDisplay && <CopyButton elementId='displayed-chat' />}
      <Box
        css={chatboxCSS.chatboxTop}
        border={
          isTheDisplayedChat && inAllStudentsChatDisplay
            ? '2px solid black'
            : ''
        }
      >
        <Conversation
          chat={chat}
          inAllStudentsChatDisplay={inAllStudentsChatDisplay}
        />
      </Box>
    </Box>
  );
}
