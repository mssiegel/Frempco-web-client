/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';
import { PAIRED } from '@utils/classrooms';
import { StudentPairedChat, StudentSoloChat } from '../types';

interface PeerIsTypingProps {
  chat: StudentPairedChat | StudentSoloChat;
  socket: Socket;
  peerIsTyping: boolean;
  setPeerIsTyping: Dispatch<SetStateAction<boolean>>;
}

export default function PeerIsTyping({
  chat,
  socket,
  peerIsTyping,
  setPeerIsTyping,
}: PeerIsTypingProps): JSX.Element {
  const typingTimeoutId = useRef(null);

  const peerIsTypingMessage =
    chat.mode === PAIRED
      ? `${chat.characters.peer} is typing...`
      : `chatbot is thinking...`;

  useEffect(() => {
    if (socket) {
      socket.on('peer is typing', () => {
        clearTimeout(typingTimeoutId.current);
        typingTimeoutId.current = setTimeout(
          () => setPeerIsTyping(false),
          3000,
        );
        setPeerIsTyping(true);
      });
    }

    return () => {
      if (socket) {
        socket.off('peer is typing');
      }
    };
  }, [socket, setPeerIsTyping]);

  return (
    <Box>
      <Typography
        variant='body2'
        sx={{ color: 'neutrals.400', fontStyle: 'italic' }}
      >
        {/* The "&nbsp;" space ensures a consistent layout, preventing the chat
             messages from shifting when the 'peer is typing' indicator appears. */}
        {peerIsTyping && peerIsTypingMessage} &nbsp;
      </Typography>
    </Box>
  );
}
