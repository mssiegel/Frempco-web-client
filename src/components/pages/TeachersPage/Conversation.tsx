/** @jsxImportSource @emotion/react */
import { useRef, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import conversationCSS from './Conversation.css';
import { filterWords, scrollDown } from '@utils/classrooms';

export default function Conversation({ chat, inAllStudentChatsDisplay }) {
  const [student1, student2] = chat.studentPair;
  const lastMessage = useRef(null);

  useEffect(() => {
    if (!inAllStudentChatsDisplay) scrollDown(lastMessage);
  }, [chat.conversation, inAllStudentChatsDisplay]);

  return (
    <Box id='displayed-chat'>
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
        let realName = '';
        if (person === 'student1') {
          fontCSS = conversationCSS.student1;
          realName = student1.realName;
        } else if (person === 'student2') {
          fontCSS = conversationCSS.student2;
          realName = student2.realName;
        } else if (person === 'teacher') fontCSS = conversationCSS.teacher;

        return (
          <Typography key={i}>
            {`(${realName}) `}
            <span css={fontCSS}>{filterWords(character)}: </span>
            <span css={conversationCSS.msg}>{filterWords(message)}</span>
          </Typography>
        );
      })}

      <span ref={lastMessage} />
    </Box>
  );
}
