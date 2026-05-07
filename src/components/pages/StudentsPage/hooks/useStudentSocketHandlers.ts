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
  setChat: Dispatch<
    SetStateAction<StudentPairedChat | StudentSoloChat | undefined>
  >;
  setStage: Dispatch<SetStateAction<Stage>>;
  setChatEndedMsg: (message: string | null) => void;
}

interface PeerDisconnectedPayload {
  graceExpiresAt?: number;
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

    function handleChatStart({
      yourCharacter,
      peersCharacter,
      peerRealName,
      shouldRevealPeerRealName,
    }) {
      setChat({
        mode: PAIRED,
        characters: {
          you: yourCharacter,
          peer: peersCharacter,
        },
        peerRealName,
        shouldRevealPeerRealName,
        conversation: [],
      });
      setStage(STAGE.chatting);
      setChatEndedMsg(null);
    }

    function handleSetPeerRealNameReveal({
      peerRealName,
      shouldRevealPeerRealName,
    }) {
      setChat((chat) => {
        if (!chat || chat.mode !== PAIRED) return chat;

        return {
          ...chat,
          peerRealName,
          shouldRevealPeerRealName,
        };
      });
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

    function handleStudentPeerEndedChat() {
      setStage(STAGE.chatEnded);
      setChatEndedMsg('Your peer ended the chat');
    }

    function handlePeerDisconnected({
      graceExpiresAt,
    }: PeerDisconnectedPayload = {}) {
      if (!graceExpiresAt) return;

      setChat((chat) => {
        if (!chat || chat.mode !== PAIRED) return chat;

        return {
          ...chat,
          peerGraceExpiresAt: graceExpiresAt,
        };
      });
    }

    function handlePeerReconnected() {
      setChat((chat) => {
        if (!chat || chat.mode !== PAIRED) return chat;

        const { peerGraceExpiresAt, ...chatWithoutGracePeriod } = chat;

        return chatWithoutGracePeriod;
      });
    }

    function handleChatEndedAfterDisconnect() {
      setChat((chat) => {
        if (!chat || chat.mode !== PAIRED) return chat;

        const { peerGraceExpiresAt, ...chatWithoutGracePeriod } = chat;

        return chatWithoutGracePeriod;
      });
      setStage(STAGE.chatEnded);
      setChatEndedMsg('Your peer left the chat');
    }

    socket.on('chat start', handleChatStart);
    socket.on('teacher:set-peer-real-name-reveal', handleSetPeerRealNameReveal);
    socket.on('solo mode: chat started', handleSoloChatStarted);
    socket.on('student:removed-from-activity', handleRemoveStudentFromActivity);
    socket.on('peer left chat', handlePeerLeftChat);
    socket.on('teacher ended chat', handleTeacherEndedChat);
    socket.on('solo mode: teacher ended chat', handleSoloModeTeacherEndedChat);
    socket.on('student:student-peer-ended-chat', handleStudentPeerEndedChat);
    socket.on('paired-chat:peer-disconnected', handlePeerDisconnected);
    socket.on('paired-chat:peer-reconnected', handlePeerReconnected);
    socket.on(
      'paired-chat:ended-after-disconnect',
      handleChatEndedAfterDisconnect,
    );

    return () => {
      socket.off('chat start', handleChatStart);
      socket.off(
        'teacher:set-peer-real-name-reveal',
        handleSetPeerRealNameReveal,
      );
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
      socket.off('student:student-peer-ended-chat', handleStudentPeerEndedChat);
      socket.off('paired-chat:peer-disconnected', handlePeerDisconnected);
      socket.off('paired-chat:peer-reconnected', handlePeerReconnected);
      socket.off(
        'paired-chat:ended-after-disconnect',
        handleChatEndedAfterDisconnect,
      );
    };
  }, [setChat, setChatEndedMsg, setStage, socket]);
}
