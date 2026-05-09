import { Paper } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import ChatboxHeader from '@components/shared/ChatboxHeader';
import { scrollToBottomOfElement, PAIRED } from '@utils/activities';
import Conversation from './Conversation';
import SendMessageSection from './SendMessageSection';
import { STAGE, Stage, StudentPairedChat, StudentSoloChat } from '../types';
import ChatEndedSection from './ChatEndedSection';
import EndChatConfirmationModal from './EndChatConfirmationModal';
import PeerReconnectBanner from './PeerReconnectBanner';

interface ChatboxProps {
  socket: Socket;
  chat: StudentPairedChat | StudentSoloChat;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  setStage: Dispatch<SetStateAction<Stage>>;
  chatEndedMsg: null | string;
  setChatEndedMsg: (message: string | null) => void;
  studentName: string;
  activityPin: string;
  addStudentToActivity: (studentName: string, pin: string) => void;
  isMobile: boolean;
  shouldShowEndChatButton: boolean;
}

export default function Chatbox({
  socket,
  chat,
  setChat,
  setStage,
  chatEndedMsg,
  setChatEndedMsg,
  studentName,
  activityPin,
  addStudentToActivity,
  isMobile,
  shouldShowEndChatButton,
}: ChatboxProps) {
  const [peerIsTyping, setPeerIsTyping] = useState(false);
  const [isEndChatModalOpen, setIsEndChatModalOpen] = useState(false);
  // Paired and solo chats have reconnect grace, so temporary failed
  // activity-membership polling should not end the UI. Chat screens end from
  // explicit socket events that set chatEndedMsg; refresh/navigation uses the
  // hard-leave server path instead.
  const hasChatEnded = Boolean(chatEndedMsg);
  const peerGraceExpiresAt =
    chat.mode === PAIRED && !hasChatEnded ? chat.peerGraceExpiresAt : undefined;
  const peerRealName =
    chat.mode === PAIRED && chat.shouldRevealPeerRealName
      ? chat.peerRealName?.trim()
      : undefined;

  function addChatMessage(sender, message: string) {
    setChat((chat) => ({
      ...chat,
      conversation: [...chat.conversation, [sender, message]],
    }));
  }

  function confirmEndChat() {
    setIsEndChatModalOpen(false);

    if (chat.mode === PAIRED) socket.emit('student:ended-paired-chat');
    else socket.emit('student:ended-solo-chat');

    setChatEndedMsg('You ended the chat');
    setStage(STAGE.chatEnded);
  }

  useEffect(() => {
    function clearTypingIndicator() {
      setPeerIsTyping(false);
    }

    if (socket) {
      socket.on('connect', clearTypingIndicator);

      socket.on('student sent message', ({ message }) => {
        setPeerIsTyping(false);
        addChatMessage('peer', message);
      });
    }

    return () => {
      if (socket) {
        socket.off('connect', clearTypingIndicator);
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
          {
            label: 'With:',
            value: chat.characters.peer,
            secondaryValue: peerRealName,
          },
        ]}
        shouldShowEndChatButton={shouldShowEndChatButton}
        onEndChat={() => setIsEndChatModalOpen(true)}
      />
      <EndChatConfirmationModal
        open={isEndChatModalOpen}
        onClose={() => setIsEndChatModalOpen(false)}
        onConfirm={confirmEndChat}
      />
      <Conversation
        chat={chat}
        socket={socket}
        peerIsTyping={peerIsTyping}
        setPeerIsTyping={setPeerIsTyping}
        containerRef={chatboxConversationContainer}
        isMobile={isMobile}
      />
      {peerGraceExpiresAt && (
        <PeerReconnectBanner graceExpiresAt={peerGraceExpiresAt} />
      )}
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
