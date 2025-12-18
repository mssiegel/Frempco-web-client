/** @jsxImportSource @emotion/react */

import { Box, Button } from '@mui/material';
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

import { scrollToBottomOfElement, SOLO, Student } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { StudentChat, SoloChat } from './index';
import chatboxCSS from './ReadOnlyChatbox.css';
import Conversation from './Conversation';
import CopyButton from '@components/shared/CopyButton';

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
    <Box css={[chatboxCSS.chatboxContainer]}>
      <Box
        css={[
          chatboxCSS.chatboxTop,
          isExpanded && chatboxCSS.expandedChatboxTop,
        ]}
        ref={chatboxConversationContainer}
      >
        <Conversation
          chat={
            isExpanded
              ? chat
              : ({
                  ...chat,
                  conversation: [...chat.conversation].slice(-5),
                } as StudentChat | SoloChat)
          }
          elementId={`chat-${chat.chatId}`}
        />
      </Box>
      <Box
        css={chatboxCSS.buttonsContainer}
        onClick={(e) => e.stopPropagation()}
        ref={buttonsContainerRef}
      >
        <Button
          size='medium'
          color='primary'
          variant='contained'
          startIcon={isExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          onClick={expandChat}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
        <CopyButton elementId={`chat-${chat.chatId}`} isTeachersPage />
        <Button
          size='medium'
          color='error'
          variant='contained'
          startIcon={<StopIcon />}
          onClick={() => endChat(chat.chatId, chat.mode, student1, student2)}
        >
          {chat.mode === SOLO ? 'End solo' : 'End pair'}
        </Button>
      </Box>
    </Box>
  );
}
