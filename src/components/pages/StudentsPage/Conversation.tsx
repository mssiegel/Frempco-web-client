/** @jsxImportSource @emotion/react */

import { Box, Typography } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

import conversationCSS from './Conversation.css';
import { filterWords } from '@utils/classrooms';

let peerTypingTimer = null;
export default function Conversation({
  socket,
  chat,
  setChat,
  scrollDown,
  lastMessage,
}) {
  const [peerIsTyping, setPeerIsTyping] = useState(false);
  const [peerName, setPeerName] = useState('');

  useEffect(() => {
    if (socket) {
      socket.on('chat message', ({ character, message }) => {
        setPeerIsTyping(false);
        setChat((chat) => ({
          ...chat,
          conversation: [...chat.conversation, ['peer', character, message]],
        }));
      });

      socket.on('peer is typing', ({ character, message }) => {
        clearTimeout(peerTypingTimer);
        peerTypingTimer = setTimeout(() => {
          setPeerIsTyping(false);
        }, 3000);
        setPeerIsTyping(true);
        setPeerName(character);
      });
    }

    return () => {
      if (socket) socket.off('chat message');
    };
  }, []);

  useEffect(() => {
    scrollDown();
  }, [chat.conversation, peerIsTyping]);

  return (
    <Box>
      <Box css={conversationCSS.introText}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            Hi <span css={conversationCSS.you}>{chat.initialChar}</span>
          </span>
          <span>{chat.startTime}</span>
        </Box>
        <span>You matched with </span>
        <span css={conversationCSS.peer}>{chat.peer}</span>
      </Box>
      {chat.conversation.map(([person, character, message], i) => {
        let fontCSS = {};
        if (person === 'peer') fontCSS = conversationCSS.peer;
        else if (person === 'you') fontCSS = conversationCSS.you;
        return (
          <Typography key={i}>
            <span css={fontCSS}>{filterWords(character)}: </span>
            <span>{filterWords(message)}</span>
          </Typography>
        );
      })}
      {peerIsTyping && (
        <Typography>
          <span css={conversationCSS.peer}>{filterWords(peerName)}: </span>
          <span>
            <TypingDots />
          </span>
        </Typography>
      )}
      <span ref={lastMessage} />
    </Box>
  );
}

const TypingDots = (props) => {
  const [msg, setMsg] = useState('.');
  useInterval(() => {
    if (msg.length === 3) return setMsg('');
    setMsg(msg + '.');
  }, 500);

  return <span>Is Typing {msg}</span>;
};

function useInterval(callback, delay) {
  const savedCallback = useRef<() => any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function') savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
