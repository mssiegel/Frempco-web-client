import { Dispatch, SetStateAction, useEffect } from 'react';
import type { NextRouter } from 'next/router';
import type { Socket } from 'socket.io-client';

import { CLIENT_EMIT_EVENTS } from '@socket/emitEvents.const';
import { CLIENT_LISTEN_EVENTS } from '@socket/listenEvents.const';
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
  chat: StudentPairedChat | StudentSoloChat | undefined;
  stage: Stage;
  setChat: Dispatch<
    SetStateAction<StudentPairedChat | StudentSoloChat | undefined>
  >;
  setStage: Dispatch<SetStateAction<Stage>>;
  setChatEndedMsg: (message: string | null) => void;
}

interface PeerDisconnectedPayload {
  graceExpiresAt?: number;
}

interface PairedChatReconnectSnapshot {
  conversation: StudentPairedChat['conversation'];
}

interface SoloChatReconnectSnapshot {
  conversation: StudentSoloChat['conversation'];
}

export function useStudentSocketHandlers({
  socket,
  router,
  chat,
  stage,
  setChat,
  setStage,
  setChatEndedMsg,
}: UseStudentSocketHandlersProps): void {
  useEffect(() => {
    if (!socket) return;

    const navigationEntry = performance.getEntriesByType(
      'navigation',
    )[0] as PerformanceNavigationTiming | undefined;

    if (navigationEntry?.type === 'reload') {
      socket.emit(CLIENT_EMIT_EVENTS.STUDENT_REFRESHED_PAGE);
    }
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    function handlePageLeave() {
      socket.emit(CLIENT_EMIT_EVENTS.STUDENT_LEFT_PAGE);
    }

    router.events.on('routeChangeStart', handlePageLeave);

    return () => {
      router.events.off('routeChangeStart', handlePageLeave);
    };
  }, [router.events, socket]);

  useEffect(() => {
    if (!socket || chat?.mode !== PAIRED || stage !== STAGE.chatting) return;

    function handleConnect() {
      socket.emit(
        CLIENT_EMIT_EVENTS.STUDENT_REJOIN_PAIRED_CHAT,
        (snapshot: PairedChatReconnectSnapshot | null) => {
          if (!snapshot) {
            setStage(STAGE.chatEnded);
            setChatEndedMsg('You were disconnected too long and the chat ended');
            return;
          }

          setChat((chat) => {
            if (!chat || chat.mode !== PAIRED) return chat;

            const { peerGraceExpiresAt, ...chatWithoutGracePeriod } = chat;

            return {
              ...chatWithoutGracePeriod,
              conversation: snapshot.conversation,
            };
          });
          setStage(STAGE.chatting);
          setChatEndedMsg(null);
        },
      );
    }

    socket.on('connect', handleConnect);

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [chat?.mode, setChat, setChatEndedMsg, setStage, socket, stage]);

  useEffect(() => {
    if (!socket || chat?.mode !== SOLO || stage !== STAGE.chatting) return;

    function handleConnect() {
      socket.emit(
        CLIENT_EMIT_EVENTS.STUDENT_REJOIN_SOLO_CHAT,
        (snapshot: SoloChatReconnectSnapshot | null) => {
          if (!snapshot) {
            setStage(STAGE.chatEnded);
            setChatEndedMsg('You were disconnected too long and the chat ended');
            return;
          }

          setChat((chat) => {
            if (!chat || chat.mode !== SOLO) return chat;

            return {
              ...chat,
              conversation: snapshot.conversation,
            };
          });
          setStage(STAGE.chatting);
          setChatEndedMsg(null);
        },
      );
    }

    socket.on('connect', handleConnect);

    return () => {
      socket.off('connect', handleConnect);
    };
  }, [chat?.mode, setChat, setChatEndedMsg, setStage, socket, stage]);

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

    socket.on(CLIENT_LISTEN_EVENTS.PAIRED_CHAT_STARTED, handleChatStart);
    socket.on(
      CLIENT_LISTEN_EVENTS.TEACHER_SET_PEER_REAL_NAME_REVEAL,
      handleSetPeerRealNameReveal,
    );
    socket.on(
      CLIENT_LISTEN_EVENTS.TEACHER_STARTED_SOLO_CHAT,
      handleSoloChatStarted,
    );
    socket.on(
      CLIENT_LISTEN_EVENTS.STUDENT_REMOVED_FROM_ACTIVITY,
      handleRemoveStudentFromActivity,
    );
    socket.on(
      CLIENT_LISTEN_EVENTS.TEACHER_ENDED_PAIRED_CHAT,
      handleTeacherEndedChat,
    );
    socket.on(
      CLIENT_LISTEN_EVENTS.TEACHER_ENDED_SOLO_CHAT,
      handleSoloModeTeacherEndedChat,
    );
    socket.on(
      CLIENT_LISTEN_EVENTS.STUDENT_PEER_ENDED_CHAT,
      handleStudentPeerEndedChat,
    );
    socket.on(
      CLIENT_LISTEN_EVENTS.PAIRED_CHAT_PEER_DISCONNECTED,
      handlePeerDisconnected,
    );
    socket.on(
      CLIENT_LISTEN_EVENTS.PAIRED_CHAT_PEER_RECONNECTED,
      handlePeerReconnected,
    );
    socket.on(
      CLIENT_LISTEN_EVENTS.PAIRED_CHAT_ENDED_AFTER_DISCONNECT,
      handleChatEndedAfterDisconnect,
    );

    return () => {
      socket.off(CLIENT_LISTEN_EVENTS.PAIRED_CHAT_STARTED, handleChatStart);
      socket.off(
        CLIENT_LISTEN_EVENTS.TEACHER_SET_PEER_REAL_NAME_REVEAL,
        handleSetPeerRealNameReveal,
      );
      socket.off(
        CLIENT_LISTEN_EVENTS.TEACHER_STARTED_SOLO_CHAT,
        handleSoloChatStarted,
      );
      socket.off(
        CLIENT_LISTEN_EVENTS.STUDENT_REMOVED_FROM_ACTIVITY,
        handleRemoveStudentFromActivity,
      );
      socket.off(
        CLIENT_LISTEN_EVENTS.TEACHER_ENDED_PAIRED_CHAT,
        handleTeacherEndedChat,
      );
      socket.off(
        CLIENT_LISTEN_EVENTS.TEACHER_ENDED_SOLO_CHAT,
        handleSoloModeTeacherEndedChat,
      );
      socket.off(
        CLIENT_LISTEN_EVENTS.STUDENT_PEER_ENDED_CHAT,
        handleStudentPeerEndedChat,
      );
      socket.off(
        CLIENT_LISTEN_EVENTS.PAIRED_CHAT_PEER_DISCONNECTED,
        handlePeerDisconnected,
      );
      socket.off(
        CLIENT_LISTEN_EVENTS.PAIRED_CHAT_PEER_RECONNECTED,
        handlePeerReconnected,
      );
      socket.off(
        CLIENT_LISTEN_EVENTS.PAIRED_CHAT_ENDED_AFTER_DISCONNECT,
        handleChatEndedAfterDisconnect,
      );
    };
  }, [setChat, setChatEndedMsg, setStage, socket]);
}
