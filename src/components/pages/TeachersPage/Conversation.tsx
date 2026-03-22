import { RefObject } from 'react';
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
    color: 'primary.500',
  },
  student2: {
    color: 'secondary.600',
  },
  studentRealName: {
    fontStyle: 'italic',
    color: 'gray',
  },
};

interface ConversationProps {
  chat: StudentChat | SoloChat;
  containerRef: RefObject<HTMLDivElement>;
  isExpanded: boolean;
}

export default function Conversation({
  chat,
  containerRef,
  isExpanded,
}: ConversationProps) {
  let student1: Student;
  let student2: Student;
  if (chat.mode === PAIRED) [student1, student2] = chat.studentPair;
  else student1 = chat.student;

  const displayedConversation = isExpanded
    ? chat.conversation
    : chat.conversation.slice(-5);

  return (
    <Box
      ref={containerRef}
      sx={{
        background: '#f8e5e0',
        minHeight: isExpanded ? '500px' : '280px',
        padding: '10px',
        maxHeight: isExpanded ? '600px' : '280px',
        overflowY: 'overlay',
        scrollBehavior: 'smooth',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Box sx={conversationSx.introText}>
        <Box component='span' mr={2}>
          ({student1.realName})
        </Box>
        <Box component='span' sx={conversationSx.student1}>
          {student1.character}
        </Box>
        <br />
        {chat.mode === PAIRED && (
          <Box component='span' mr={2}>
            {student2.realName}
          </Box>
        )}
        <Box component='span' sx={conversationSx.student2}>
          {chat.mode === PAIRED ? student2.character : 'chatbot'}
        </Box>
        <Box>------</Box>
      </Box>
      {displayedConversation.map(([messageAuthor, message], i) => {
        // Solo chats use "student"; normalize it to student1 so display logic has 3 cases.
        const author = messageAuthor === 'student' ? 'student1' : messageAuthor;

        const character =
          author === 'student1'
            ? student1.character
            : author === 'student2'
            ? student2.character
            : 'chatbot';

        // Only students have real names; chatbots do not
        const realName =
          author === 'student1'
            ? student1.realName
            : author === 'student2'
            ? student2.realName
            : '';
        const color =
          author === 'student1'
            ? conversationSx.student1.color
            : conversationSx.student2.color;

        return (
          <Typography key={i}>
            {realName && (
              <Box component='span' sx={conversationSx.studentRealName} mr={2}>
                {realName}
              </Box>
            )}
            <Box component='span' sx={{ color }} fontWeight='bold' mr={1}>
              {character}:
            </Box>
            <Box component='span' sx={{ overflowWrap: 'break-word' }}>
              {filterWords(message)}
            </Box>
          </Typography>
        );
      })}
    </Box>
  );
}
