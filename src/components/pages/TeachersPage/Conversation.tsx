/** @jsxImportSource @emotion/react */
import { useRef, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import conversationCSS from './Conversation.css';
import { filterWords } from '@utils/classrooms';

export default function Conversation({ chat }) {
  const [student1, student2] = chat.studentPair;
  const lastMessage = useRef(null);

  useEffect(() => {
    if (lastMessage.current)
      lastMessage.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat.conversation]);

  return (
    <Box>
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
