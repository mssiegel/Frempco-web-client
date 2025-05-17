/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { scrollToBottomOfElement } from '@utils/classrooms';
import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';
import CopyButton from '@components/shared/CopyButton';

export default function Chatbox({ socket, chat, setChat, chatEndedMsg }) {
  const [peerIsTyping, setPeerIsTyping] = useState(false);

  function addChatMessage(sender, message) {
    setChat((chat) => ({
      ...chat,
      conversation: [...chat.conversation, [sender, message]],
    }));
  }

  useEffect(() => {
    if (socket) {
      socket.on('student sent message', ({ message }) => {
        setPeerIsTyping(false);
        addChatMessage('peer', message);
      });

      socket.on('teacher sent message', ({ message }) => {
        addChatMessage('teacher', message);
      });

      socket.on('solo mode: teacher sent message', ({ message }) => {
        addChatMessage('teacher', message);
      });
    }

    return () => {
      if (socket) {
        socket.off('student sent message');
        socket.off('teacher sent message');
        socket.off('solo mode: teacher sent message');
      }
    };
  }, [setChat, socket]);

  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [chat.conversation]);

  const chatboxConversationContainer = useRef(null);

  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <CopyButton elementId='conversation' />
      <Box css={chatboxCSS.chatboxTop} ref={chatboxConversationContainer}>
        <Conversation chat={chat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages
          socket={socket}
          chat={chat}
          setChat={setChat}
          chatEndedMsg={chatEndedMsg}
          peerIsTyping={peerIsTyping}
          setPeerIsTyping={setPeerIsTyping}
        />
      </Box>
    </Box>
  );
}
