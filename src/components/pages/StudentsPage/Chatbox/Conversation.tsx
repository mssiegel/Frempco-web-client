/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';

import { filterWords } from '@utils/classrooms';
import { StudentPairedChat, StudentSoloChat } from '../index';

interface ConversationProps {
  chat: StudentPairedChat | StudentSoloChat;
}

export default function Conversation({ chat }: ConversationProps): JSX.Element {
  return (
    <Box>
      {chat.conversation.map(([messageAuthor, message], i) => {
        const characterName =
          messageAuthor === 'you' ? chat.characters.you : chat.characters.peer;
        const nameColor =
          messageAuthor === 'you' ? 'primary.500' : 'secondary.600';
        let verticalMargin = '0px';
        if (i > 0 && chat.conversation[i - 1][0] !== messageAuthor) {
          // The 4px margin visually separates the different speakers.
          verticalMargin = '4px';
        }

        return (
          <Box key={i} sx={{ mt: verticalMargin, lineHeight: 1.25 }}>
            <Typography
              component='span'
              variant='body2'
              sx={{ color: nameColor, fontWeight: 'bold', pr: 0.5 }}
            >
              {characterName}:
            </Typography>
            <Typography
              component='span'
              variant='body2'
              color='neutrals.600'
              sx={{ overflowWrap: 'break-word' }}
            >
              {filterWords(message)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
