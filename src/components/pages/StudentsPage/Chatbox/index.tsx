import { Paper } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import ChatboxHeader from '@components/shared/ChatboxHeader';
import featureFlags from '@config/featureFlags';
import { scrollToBottomOfElement, PAIRED } from '@utils/activities';
import { useStudentInActivity } from '../hooks/useStudentInActivity';
import Conversation from './Conversation';
import SendMessageSection from './SendMessageSection';
import { StudentPairedChat, StudentSoloChat } from '../types';
import ChatEndedSection from './ChatEndedSection';

interface ChatboxProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  chatEndedMsg: null | string;
  setChatEndedMsg: (message: string | null) => void;
  studentName: string;
  activityPin: string;
  addStudentToActivity: (studentName: string, pin: string) => void;
  sessionId: string;
  isMobile: boolean;
}

export default function Chatbox({
  socket,
  chat,
  setChat,
  chatEndedMsg,
  setChatEndedMsg,
  studentName,
  activityPin,
  addStudentToActivity,
  sessionId,
  isMobile,
}: ChatboxProps) {
  const [peerIsTyping, setPeerIsTyping] = useState(false);
  const isConnected = useStudentInActivity(activityPin, sessionId);
  const hasChatEnded = !isConnected || Boolean(chatEndedMsg);

  function addChatMessage(sender, message: string) {
    setChat((chat) => ({
      ...chat,
      conversation: [...chat.conversation, [sender, message]],
    }));
  }

  function handleEndChat() {
    const endChatConfirmed = confirm('Are you sure you want to end this chat?');
    if (!endChatConfirmed) return;

    socket.emit('student:ended-paired-chat');

    // Update local state immediately
    setChatEndedMsg('You ended the chat');
  }

  useEffect(() => {
    if (socket) {
      socket.on('student sent message', ({ message }) => {
        setPeerIsTyping(false);
        addChatMessage('peer', message);
      });
    }

    return () => {
      if (socket) {
        socket.off('student sent message');
      }
    };
  }, [setChat, socket]);

  useEffect(() => {
    scrollToBottomOfElement(chatboxConversationContainer);
  }, [chat.conversation]);

  const chatboxConversationContainer = useRef(null);

  return (
    <Paper
      elevation={6}
      sx={{
        border: '1px solid silver',
        borderRadius: '12px',
        paddingBottom: '8px',
        backgroundColor: 'white',
        width: '500px',
        '@media (max-width: 500px)': {
          width: '100%',
        },
      }}
    >
      <ChatboxHeader
        headerRows={[
          { label: "You're:", value: chat.characters.you },
          { label: 'With:', value: chat.characters.peer },
        ]}
        shouldShowEndChatButton={
          featureFlags.isStudentEndChatButtonLaunched.enabled &&
          chat.mode === PAIRED
        }
        onEndChat={handleEndChat}
      />
      <Conversation
        chat={chat}
        socket={socket}
        peerIsTyping={peerIsTyping}
        setPeerIsTyping={setPeerIsTyping}
        containerRef={chatboxConversationContainer}
        isMobile={isMobile}
      />
      {!hasChatEnded ? (
        <SendMessageSection
          socket={socket}
          chat={chat}
          setChat={setChat}
          setPeerIsTyping={setPeerIsTyping}
        />
      ) : (
        <ChatEndedSection
          chatEndedMsg={chatEndedMsg}
          isMobile={isMobile}
          studentName={studentName}
          activityPin={activityPin}
          addStudentToActivity={addStudentToActivity}
        />
      )}
    </Paper>
  );
}
