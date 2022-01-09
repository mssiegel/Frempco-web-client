/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';

import conversationCSS from './Conversation.css';

export default function Conversation({ chat }) {
  return (
    <Box>
      <Box css={conversationCSS.introText}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Hi!</span>
          <span>{chat.startTime || '3:05pm'}</span>
        </Box>
        <span>You matched with </span>
        <span css={conversationCSS.peer}>{chat.peer || 'unknown peer'}</span>
      </Box>
      {chat.conversation.map(([person, character, message], i) => {
        let fontCSS = {};
        if (person === 'peer') fontCSS = conversationCSS.peer;
        else if (person === 'you') fontCSS = conversationCSS.you;

        return (
          <Typography key={i}>
            <span css={fontCSS}>{character}: </span>
            <span>{message}</span>
          </Typography>
        );
      })}
    </Box>
  );
}
