/** @jsxImportSource @emotion/react */
import { useRef, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import conversationCSS from './Conversation.css';
import { filterWords, scrollDown } from '@utils/classrooms';

export default function Conversation({ chat }) {
  const [student1, student2] = chat.studentPair;
  const lastMessage = useRef(null);

  useEffect(() => {
    if (chat.chatId !== 'homepage sample chat') scrollDown(lastMessage);
  }, [chat.chatId, chat.conversation]);

  return (
    <Box id='conversation'>
      <Box css={conversationCSS.introText}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <span css={conversationCSS.student1}>{student1.realName}</span> (
            {student1.character})
            <br />
            <span css={conversationCSS.student2}>{student2.realName}</span> (
            {student2.character})
          </Box>
          <span>{chat.startTime}</span>
        </Box>
        ------
      </Box>
      {chat.conversation.map(([person, character, message], i) => {
        let fontCSS = {};
        if (person === 'student1') fontCSS = conversationCSS.student1;
        else if (person === 'student2') fontCSS = conversationCSS.student2;

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
