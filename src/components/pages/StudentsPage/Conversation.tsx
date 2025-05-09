/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';

import conversationCSS from './Conversation.css';
import { filterWords } from '@utils/classrooms';

export default function Conversation({ socket, chat, setChat }) {
  function addChatMessage(sender, message) {
    setChat((chat) => ({
      ...chat,
      conversation: [...chat.conversation, [sender, message]],
    }));
  }

  useEffect(() => {
    if (socket) {
      socket.on('student sent message', ({ message }) => {
        addChatMessage('peer', message);
      });
      socket.on('teacher sent message', ({ message }) => {
        addChatMessage('teacher', message);
      });
      socket.on('solo mode: teacher sent message', ({ message }) => {
        addChatMessage('teacher', message);
      });
    }

    return () => {
      if (socket) {
        socket.off('student sent message');
        socket.off('teacher sent message');
        socket.off('solo mode: teacher sent message');
      }
    };
  }, [setChat, socket]);

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
