/** @jsxImportSource @emotion/react */

import { Box, Button, Paper } from '@mui/material';
import {
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
  useContext,
  useState,
} from 'react';
import {
  UnfoldMore as UnfoldMoreIcon,
  UnfoldLess as UnfoldLessIcon,
  Stop as StopIcon,
} from '@mui/icons-material';

import { scrollToBottomOfElement, SOLO } from '@utils/classrooms';
import { ChatParticipants, Student, StudentChat, SoloChat } from '../types';
import { SocketContext } from '@contexts/SocketContext';
import Header from './Header';
import Conversation from './Conversation';

interface ReadOnlyChatboxProps {
  chat: StudentChat | SoloChat;
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  setUnpairedStudents: Dispatch<SetStateAction<Student[]>>;
}

export default function ReadOnlyChatbox({
  chat,
  setStudentChats,
  setUnpairedStudents,
}: ReadOnlyChatboxProps) {
  const socket = useContext(SocketContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const chatboxConversationContainer = useRef<HTMLDivElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [chat.conversation, isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      // Scroll the buttons container into view when the chatbox's expand animation finishes
      const expansionAnimationInMilliseconds = 300;
      setTimeout(() => {
        buttonsContainerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }, expansionAnimationInMilliseconds);
    }
  }, [isExpanded]);

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
  const participants: ChatParticipants = {
    student1,
    student2: chat.mode === SOLO ? undefined : chat.studentPair[1],
  };

  return (
    <Paper
      elevation={6}
      sx={{
        maxWidth: 600,
        border: '1px solid silver',
        borderRadius: '12px',
        backgroundColor: 'white',
        overflow: 'hidden',
      }}
    >
      <Header participants={participants} />

      <Conversation
        containerRef={chatboxConversationContainer}
        chat={chat}
        participants={participants}
        isExpanded={isExpanded}
      />
      <Box
        sx={{
          backgroundColor: 'secondary.400',
          padding: '10px',
          display: 'flex',
          justifyContent: 'space-around',
        }}
        onClick={(e) => e.stopPropagation()}
        ref={buttonsContainerRef}
      >
        <Button
          color='primary'
          variant='outlined'
          startIcon={isExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
        <Button
          color='error'
          variant='contained'
          startIcon={<StopIcon />}
          onClick={() => endChat(chat.chatId, chat.mode, student1, student2)}
        >
          {chat.mode === SOLO ? 'End solo' : 'End pair'}
        </Button>
      </Box>
    </Paper>
  );
}
