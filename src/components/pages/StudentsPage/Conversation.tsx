/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

import conversationCSS from './Conversation.css';
import { filterWords } from '@utils/classrooms';

export default function Conversation({ socket, chat, setChat }) {
  useEffect(() => {
    if (socket) {
      socket.on('student sent message', ({ character, message }) => {
        setChat((chat) => ({
          ...chat,
          conversation: [...chat.conversation, ['peer', character, message]],
        }));
      });
      socket.on('teacher sent message', ({ message }) => {
        setChat((chat) => ({
          ...chat,
          conversation: [...chat.conversation, ['teacher', 'TEACHER', message]],
        }));
      });
    }

    return () => {
      if (socket) {
        socket.off('student sent message');
        socket.off('teacher sent message');
      }
    };
  }, [setChat, socket]);

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
        else if (person === 'teacher') fontCSS = conversationCSS.teacher;

        return (
          <Typography key={i}>
            <span css={fontCSS}>{filterWords(character)}: </span>
            <span css={conversationCSS.msg}>{filterWords(message)}</span>
          </Typography>
        );
      })}
    </Box>
  );
}
