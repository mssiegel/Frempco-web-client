/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import CopyButton from '@components/shared/CopyButton';

export default function Chatbox({
  chat,
  isTheDisplayedChat,
  inAllStudentChatsDisplay,
}) {
  return (
    <Box css={chatboxCSS.chatboxContainer}>
      {!inAllStudentChatsDisplay && <CopyButton elementId='displayed-chat' />}
      <Box
        css={chatboxCSS.chatboxTop}
        border={
          isTheDisplayedChat && inAllStudentChatsDisplay
            ? '6px solid royalblue'
            : ''
        }
      >
        <Conversation
          chat={chat}
          inAllStudentChatsDisplay={inAllStudentChatsDisplay}
        />
      </Box>
    </Box>
  );
}
