/** @jsxImportSource @emotion/react */
import { Box, Typography } from '@mui/material';

import conversationCSS from './Conversation.css';
import { filterWords, PAIRED, Student } from '@utils/classrooms';
import { StudentChat, SoloChat } from './index';

interface ConversationProps {
  chat: StudentChat | SoloChat;
  elementId: string;
}

export default function Conversation({ chat, elementId }: ConversationProps) {
  let student1: Student;
  let student2: Student;
  if (chat.mode === PAIRED) [student1, student2] = chat.studentPair;
  else student1 = chat.student;

  return (
    <Box id={elementId}>
      <Box css={conversationCSS.introText}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            ({student1.realName})&nbsp;&nbsp;
            <span css={conversationCSS.student1}>{student1.character}</span>
            <br />
            {chat.mode === PAIRED && <>{student2.realName}&nbsp;&nbsp;</>}
            <span css={conversationCSS.student2}>
              {chat.mode === PAIRED ? student2.character : 'chatbot'}
            </span>
          </Box>
          <span>{chat.startTime}</span>
        </Box>
        ------
      </Box>
      {chat.conversation.map(([messageAuthor, message], i) => {
        let character = '';
        let realName = '';
        let fontCSS = {};
        switch (messageAuthor) {
          case 'student1':
            character = student1.character;
            realName = student1.realName;
            fontCSS = conversationCSS.student1;
            break;
          case 'student2':
            character = student2.character;
            realName = student2.realName;
            fontCSS = conversationCSS.student2;
            break;
          case 'student':
            character = student1.character;
            realName = student1.realName;
            fontCSS = conversationCSS.student1;
            break;
          case 'chatbot':
            character = 'chatbot';
            fontCSS = conversationCSS.student2;
            break;
          case 'teacher':
            character = 'TEACHER';
            fontCSS = conversationCSS.teacher;
        }

        return (
          <Typography key={i}>
            {/* Only students have real names; teacher does not */}
            {realName && (
              <span css={conversationCSS.lessImportantText}>
                {realName}&nbsp;&nbsp;
              </span>
            )}
            <span css={fontCSS}>{character}: </span>
            <span css={conversationCSS.msg}>{filterWords(message)}</span>
          </Typography>
        );
      })}
    </Box>
  );
}
