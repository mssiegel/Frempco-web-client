/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import CopyButton from '@components/shared/CopyButton';
import SendMessages from './SendMessages';

export default function Chatbox({
  socket,
  chat,
  isTheDisplayedChat,
  inAllStudentChatsDisplay,
  setStudentChats,
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

      {/* Include send messages component if its the primary displayed chat */}
      {isTheDisplayedChat && !inAllStudentChatsDisplay && (
        <Box css={chatboxCSS.chatboxBottom}>
          <SendMessages
            socket={socket}
            chatId={chat.chatId}
            setStudentChats={setStudentChats}
          />
        </Box>
      )}
    </Box>
  );
}
