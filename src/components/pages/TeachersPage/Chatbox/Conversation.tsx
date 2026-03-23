import { RefObject } from 'react';
import { Box, Typography } from '@mui/material';

import { filterWords } from '@utils/classrooms';
import { ChatParticipants, StudentChat, SoloChat } from '../types';

interface ConversationProps {
  chat: StudentChat | SoloChat;
  participants: ChatParticipants;
  containerRef: RefObject<HTMLDivElement>;
  isExpanded: boolean;
}

export default function Conversation({
  chat,
  participants,
  containerRef,
  isExpanded,
}: ConversationProps) {
  const { student1, student2 } = participants;
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
      {displayedConversation.map(([messageAuthor, message], i) => {
        // For first student: Paired chats use "student1" and Solo chats use "student".
        const isStudent1 = ['student1', 'student'].includes(messageAuthor);
        let verticalMargin = '0px';
        if (i > 0 && displayedConversation[i - 1][0] !== messageAuthor) {
          // The 4px margin visually separates the different speakers.
          verticalMargin = '4px';
        }

        const character = isStudent1
          ? student1.character
          : messageAuthor === 'student2'
          ? student2.character
          : 'chatbot';

        // Only students have real names; chatbots do not
        const realName = isStudent1
          ? student1.realName
          : messageAuthor === 'student2'
          ? student2.realName
          : '';
        const characterNameColor = isStudent1 ? 'primary.500' : 'secondary.600';

        return (
          <Box key={i} sx={{ mt: verticalMargin, lineHeight: 1.25 }}>
            {realName && (
              <Typography
                component='span'
                variant='body2'
                sx={{ fontStyle: 'italic', color: 'neutrals.400', pr: 1 }}
              >
                ({realName})
              </Typography>
            )}
            <Typography
              component='span'
              variant='body2'
              sx={{ color: characterNameColor, fontWeight: 'bold', pr: 0.5 }}
            >
              {character}:
            </Typography>
            <Typography
              component='span'
              variant='body2'
              sx={{ color: 'neutrals.600', overflowWrap: 'break-word' }}
            >
              {filterWords(message)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
