/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { Socket } from 'socket.io-client';

import { CLIENT_LISTEN_EVENTS } from '@socket/listenEvents.const';
import { PAIRED } from '@utils/activities';
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
      socket.on(CLIENT_LISTEN_EVENTS.PEER_TYPING, () => {
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
        socket.off(CLIENT_LISTEN_EVENTS.PEER_TYPING);
      }
    };
  }, [socket, setPeerIsTyping]);

  return (
    <Box>
      <Typography
        variant='body2'
        sx={{ color: 'neutrals.400', fontStyle: 'italic' }}
      >
        {/* The "&nbsp;" space keeps chat messages from shifting when the
             typing indicator appears. */}
        {peerIsTyping && peerIsTypingMessage} &nbsp;
      </Typography>
    </Box>
  );
}
