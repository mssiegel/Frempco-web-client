/** @jsxImportSource @emotion/react */

import { Box, Button } from '@mui/material';
import { useRef, useEffect, useContext, useState } from 'react';

import {
  scrollToBottomOfElement,
  SOLO,
  Dispatch,
  SetStateAction,
  Student,
} from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { StudentChat, SoloChat } from '../index';
import chatboxCSS from './Chatbox.css';
import Conversation from '../Conversation';

interface ReadOnlyChatboxProps {
  chat: StudentChat | SoloChat;
  isSelected: boolean;
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  setUnpairedStudents: Dispatch<SetStateAction<Student[]>>;
}

export default function ReadOnlyChatbox({
  chat,
  isSelected,
  setStudentChats,
  setUnpairedStudents,
}: ReadOnlyChatboxProps) {
  const socket = useContext(SocketContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const chatboxConversationContainer = useRef(null);

  const displayChat: StudentChat | SoloChat = { ...chat };
  if (!isExpanded) {
    displayChat.conversation = [...displayChat.conversation].slice(
      -5,
    ) as typeof displayChat.conversation;
  }

  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [displayChat.conversation]);

  function expandChat(e: React.MouseEvent) {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  }

  function endChat(chatId, chatMode, student1, student2) {
    const endChatConfirmed = confirm(
      `Are you sure you want to end the ${
        chatMode === SOLO ? 'solo ' : ''
      }chat for ${student1.realName} & ${student2.realName}?`,
    );
    if (!endChatConfirmed) return;
    if (chatMode === SOLO) {
      socket.emit('solo mode: end chat', { chatId });
      setStudentChats((chats) =>
        chats.filter((chat) => chat.chatId !== chatId),
      );
      setUnpairedStudents((unpaired) => [...unpaired, student1]);
    } else {
      socket.emit('unpair student chat', { chatId, student1, student2 });
      setStudentChats((chats) =>
        chats.filter((chat) => chat.chatId !== chatId),
      );
      setUnpairedStudents((unpaired) => [...unpaired, student1, student2]);
    }
  }

  const student1 = chat.mode === SOLO ? chat.student : chat.studentPair[0];
  const student2 =
    chat.mode === SOLO ? { realName: 'chatbot' } : chat.studentPair[1];

  return (
    <Box
      css={[chatboxCSS.chatboxContainer, chatboxCSS.readOnlyChatboxWrapper]}
      border={isSelected ? '3px solid royalblue' : ''}
    >
      <Box
        css={[
          chatboxCSS.chatboxTop,
          isExpanded && chatboxCSS.expandedChatboxTop,
        ]}
        ref={chatboxConversationContainer}
      >
        <Conversation chat={displayChat} />
      </Box>
      <Box
        css={chatboxCSS.chatButtonsContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size='medium'
          color='primary'
          variant='contained'
          onClick={expandChat}
        >
          {isExpanded ? 'Collapse chat' : 'Expand chat'}
        </Button>
        <Button
          size='medium'
          color='warning'
          variant='contained'
          onClick={() => endChat(chat.chatId, chat.mode, student1, student2)}
        >
          {chat.mode === SOLO ? 'End solo chat' : 'End chat'}
        </Button>
      </Box>
    </Box>
  );
}
