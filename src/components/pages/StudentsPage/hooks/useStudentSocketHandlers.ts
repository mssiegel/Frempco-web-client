import { Dispatch, SetStateAction, useEffect } from 'react';
import type { NextRouter } from 'next/router';
import type { Socket } from 'socket.io-client';

import { PAIRED, SOLO } from '@utils/activities';
import {
  STAGE,
  Stage,
  StudentPairedChat,
  StudentSoloChat,
} from '@components/pages/StudentsPage/types';

interface UseStudentSocketHandlersProps {
  socket: Socket;
  router: NextRouter;
  setChat: Dispatch<SetStateAction<StudentPairedChat | StudentSoloChat>>;
  setStage: Dispatch<SetStateAction<Stage>>;
  setChatEndedMsg: (message: string | null) => void;
}

export function useStudentSocketHandlers({
  socket,
  router,
  setChat,
  setStage,
  setChatEndedMsg,
}: UseStudentSocketHandlersProps): void {
  useEffect(() => {
    if (!socket) return;

    function handleRouteChange() {
      socket.emit('user disconnected');
    }

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, socket]);

  useEffect(() => {
    if (!socket) return;

    function handleChatStart({ yourCharacter, peersCharacter }) {
      setChat({
        mode: PAIRED,
        characters: {
          you: yourCharacter,
          peer: peersCharacter,
        },
        conversation: [],
      });
      setStage(STAGE.chatting);
      setChatEndedMsg(null);
    }

    function handleSoloChatStarted({ character, messages }) {
      setChat({
        mode: SOLO,
        characters: {
          you: character,
          peer: 'chatbot',
        },
        conversation: messages,
      });
      setStage(STAGE.chatting);
      setChatEndedMsg(null);
    }

    function handleRemoveStudentFromActivity() {
      setStage(STAGE.removedByTeacher);
    }

    function handlePeerLeftChat() {
      setStage(STAGE.chatEnded);
      setChatEndedMsg('Your peer left the chat');
    }

    function handleTeacherEndedChat() {
      setStage(STAGE.chatEnded);
      setChatEndedMsg('Your teacher ended your chat');
    }

    function handleSoloModeTeacherEndedChat() {
      setStage(STAGE.chatEnded);
      setChatEndedMsg('Your teacher ended your chat');
    }

    socket.on('chat start', handleChatStart);
    socket.on('solo mode: chat started', handleSoloChatStarted);
    socket.on('student:removed-from-activity', handleRemoveStudentFromActivity);
    socket.on('peer left chat', handlePeerLeftChat);
    socket.on('teacher ended chat', handleTeacherEndedChat);
    socket.on('solo mode: teacher ended chat', handleSoloModeTeacherEndedChat);

    return () => {
      socket.off('chat start', handleChatStart);
      socket.off('solo mode: chat started', handleSoloChatStarted);
      socket.off(
        'student:removed-from-activity',
        handleRemoveStudentFromActivity,
      );
      socket.off('peer left chat', handlePeerLeftChat);
      socket.off('teacher ended chat', handleTeacherEndedChat);
      socket.off(
        'solo mode: teacher ended chat',
        handleSoloModeTeacherEndedChat,
      );
    };
  }, [setChat, setChatEndedMsg, setStage, socket]);
}
