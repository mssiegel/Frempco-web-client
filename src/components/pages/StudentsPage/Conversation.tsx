/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

import conversationCSS from './Conversation.css';
import { filterWords } from '@utils/classrooms';

export default function Conversation({ chat }) {
  return (
    <Box id='conversation'>
      <Box css={conversationCSS.introText}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            Hi <span css={conversationCSS.you}>{chat.characters.you}</span>
          </span>
          <span>{chat.startTime}</span>
        </Box>
        <span>You matched with </span>
        <span css={conversationCSS.peer}>{chat.characters.peer}</span>
      </Box>
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
          case 'teacher':
            character = 'TEACHER';
            fontCSS = conversationCSS.teacher;
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
