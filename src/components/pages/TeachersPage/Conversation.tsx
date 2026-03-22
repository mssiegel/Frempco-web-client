import { Box, Typography } from '@mui/material';

import { filterWords, PAIRED } from '@utils/classrooms';
import { StudentChat, SoloChat, Student } from './types';

const conversationSx = {
  introText: {
    fontStyle: 'italic',
    color: 'gray',
    mb: '5px',
  },
  student1: {
    fontWeight: 'bold',
    color: '#0070ff',
  },
  student2: {
    fontWeight: 'bold',
    color: 'red',
  },
  lessImportantText: {
    fontStyle: 'italic',
    color: 'gray',
  },
  msg: {
    wordBreak: 'break-word',
  },
};

interface ConversationProps {
  chat: StudentChat | SoloChat;
}

export default function Conversation({ chat }: ConversationProps) {
  let student1: Student;
  let student2: Student;
  if (chat.mode === PAIRED) [student1, student2] = chat.studentPair;
  else student1 = chat.student;

  return (
    <Box>
      <Box sx={conversationSx.introText}>
        ({student1.realName})&nbsp;&nbsp;
        <Box component='span' sx={conversationSx.student1}>
          {student1.character}
        </Box>
        <br />
        {chat.mode === PAIRED && <>{student2.realName}&nbsp;&nbsp;</>}
        <Box component='span' sx={conversationSx.student2}>
          {chat.mode === PAIRED ? student2.character : 'chatbot'}
        </Box>
        <Box>------</Box>
      </Box>
      {chat.conversation.map(([messageAuthor, message], i) => {
        let character = '';
        let realName = '';
        let fontSx = conversationSx.student1;
        switch (messageAuthor) {
          case 'student1':
            character = student1.character;
            realName = student1.realName;
            fontSx = conversationSx.student1;
            break;
          case 'student2':
            character = student2.character;
            realName = student2.realName;
            fontSx = conversationSx.student2;
            break;
          case 'student':
            character = student1.character;
            realName = student1.realName;
            fontSx = conversationSx.student1;
            break;
          case 'chatbot':
            character = 'chatbot';
            fontSx = conversationSx.student2;
            break;
        }

        return (
          <Typography key={i}>
            {/* Only students have real names; teacher does not */}
            {realName && (
              <Box component='span' sx={conversationSx.lessImportantText}>
                {realName}&nbsp;&nbsp;
              </Box>
            )}
            <Box component='span' sx={fontSx}>
              {character}:{' '}
            </Box>
            <Box component='span' sx={conversationSx.msg}>
              {filterWords(message)}
            </Box>
          </Typography>
        );
      })}
    </Box>
  );
}
