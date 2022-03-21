/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

import conversationCSS from './Conversation.css';
import { filterWords } from '@utils/classrooms';
import { scrollDown } from '@utils/classrooms';

export default function Conversation({ socket, chat, setChat }) {
  const lastMessage = useRef(null);
  useEffect(() => {
    if (socket) {
      socket.on('chat message', ({ character, message }) => {
        setChat((chat) => ({
          ...chat,
          conversation: [...chat.conversation, ['peer', character, message]],
        }));
      });
    }

    return () => {
      if (socket) socket.off('chat message');
    };
  }, [setChat, socket]);

  useEffect(() => {
    scrollDown(lastMessage);
  }, [chat.conversation]);

  return (
    <Box id='conversation'>
      <Box css={conversationCSS.introText}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            Hi <span css={conversationCSS.you}>{chat.initialChar}</span>
          </span>
          <span>{chat.startTime}</span>
        </Box>
        <span>You matched with </span>
        <span css={conversationCSS.peer}>{chat.peer}</span>
      </Box>
      {chat.conversation.map(([person, character, message], i) => {
        let fontCSS = {};
        if (person === 'peer') fontCSS = conversationCSS.peer;
        else if (person === 'you') fontCSS = conversationCSS.you;
        return (
          <Typography key={i}>
            <span css={fontCSS}>{filterWords(character)}: </span>
            <span css={conversationCSS.msg}>{filterWords(message)}</span>
          </Typography>
        );
      })}

      <span ref={lastMessage} />
    </Box>
  );
}
