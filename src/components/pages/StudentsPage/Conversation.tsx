/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';

import conversationCSS from './Conversation.css';
import { filterWords } from '@utils/classrooms';
import { StudentPairedChat, StudentSoloChat } from './index';

interface ConversationProps {
  chat: StudentPairedChat | StudentSoloChat;
}

export default function Conversation({ chat }: ConversationProps) {
  return (
    <Box>
      {chat.conversation.map(([messageAuthor, message], i) => {
        let character = '';
        let fontCSS = {};
        switch (messageAuthor) {
          case 'you':
            character = chat.characters.you;
            fontCSS = conversationCSS.you;
            break;
          case 'peer':
          case 'chatbot':
            character = chat.characters.peer;
            fontCSS = conversationCSS.peer;
            break;
        }

        return (
          <Typography key={i}>
            <span css={fontCSS}>{character}: </span>
            <span css={conversationCSS.msg}>{filterWords(message)}</span>
          </Typography>
        );
      })}
    </Box>
  );
}
