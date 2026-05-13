import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { PAIRED } from '@utils/activities';
import { CLIENT_EMIT_EVENTS } from '@socket/emitEvents.const';
import { CLIENT_LISTEN_EVENTS } from '@socket/listenEvents.const';
import { ChatMessage, SoloChat, Student, StudentChat } from '../types';
import { useSocketConnection } from '@contexts/SocketContext';
import { useRouter } from 'next/router';
import Link from '@components/shared/Link';
import UnpairedStudentsAccordion from './UnpairedStudentsAccordion';
import SetupActivityAccordion from './SetupActivityAccordion';
import ChatsInProgressAccordion from './ChatsInProgressAccordion';
import CompletedChatsAccordion from './CompletedChatsAccordion';
import PageHeader from '@components/shared/PageHeader';

interface InProgressActivityProps {
  activityPin: string;
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export default function InProgressActivity({
  activityPin,
  characters,
  setCharacters,
  email,
  setEmail,
}: InProgressActivityProps): JSX.Element {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const TEN_SECONDS = 10000;
  const router = useRouter();
  const { socket, sessionId } = useSocketConnection();

  console.log('Teacher sessionId:', sessionId);
  console.log('Teacher transport socket id:', socket?.id ?? 'No socket found');

  const [isConnected, setIsConnected] = useState(true);
  const [unpairedStudents, setUnpairedStudents] = useState<Student[]>([]);
  const [studentChats, setStudentChats] = useState<(StudentChat | SoloChat)[]>(
    [],
  );
  const [lastPairedPartnerBySessionId, setLastPairedPartnerBySessionId] =
    useState<Record<string, string>>({});

  const { activeChats, completedChats } = useMemo(() => {
    const activeChats = [];
    const completedChats = [];
    for (const chat of studentChats) {
      if (chat.isCompleted) completedChats.push(chat);
      else activeChats.push(chat);
    }
    return { activeChats, completedChats };
  }, [studentChats]);

  const updateLastPairedPartners = useCallback(
    (studentPair: StudentChat['studentPair']) => {
      const [student1, student2] = studentPair;
      setLastPairedPartnerBySessionId((lastPairedPartners) => ({
        ...lastPairedPartners,
        [student1.sessionId]: student2.sessionId,
        [student2.sessionId]: student1.sessionId,
      }));
    },
    [],
  );

  const markAllChatsAsCompleted = useCallback(
    () => {
      activeChats.forEach((chat) => {
        if (chat.mode === PAIRED) updateLastPairedPartners(chat.studentPair);
      });
      const completedChatIds = new Set(
        activeChats.map((chat) => chat.chatId),
      );
      setStudentChats((chats) =>
        chats.map((chat) =>
          completedChatIds.has(chat.chatId)
            ? { ...chat, isCompleted: true }
            : chat,
        ),
      );
    },
    [activeChats, updateLastPairedPartners],
  );

  const markChatAsCompleted = useCallback(
    (completedChat: StudentChat | SoloChat) => {
      if (completedChat.mode === PAIRED)
        updateLastPairedPartners(completedChat.studentPair);

      setStudentChats((chats) =>
        chats.map((chat) =>
          chat.chatId === completedChat.chatId
            ? { ...chat, isCompleted: true }
            : chat,
        ),
      );
    },
    [updateLastPairedPartners],
  );

  const markChatAsCompletedById = useCallback(
    ({ chatId }: { chatId: string }) => {
      const completedChat = studentChats.find((chat) => chat.chatId === chatId);
      if (!completedChat) return;

      markChatAsCompleted(completedChat);
    },
    [markChatAsCompleted, studentChats],
  );

  useEffect(() => {
    // Check if the teacher is still connected to the activity every 10 seconds.
    const connectionCheckInterval = setInterval(async () => {
      try {
        const getResponse = await fetch(`${apiUrl}/activities/${activityPin}`, {
          method: 'GET',
        });
        const { isActive } = await getResponse.json();
        if (!isActive) {
          setIsConnected(false);
          clearInterval(connectionCheckInterval);
        }
      } catch (error) {
        // If the request fails, assume the connection was lost.
        setIsConnected(false);
        clearInterval(connectionCheckInterval);
      }
    }, TEN_SECONDS);

    return () => clearInterval(connectionCheckInterval);
  }, [apiUrl, activityPin]);

  useEffect(() => {
    if (socket) {
      socket.on(
        CLIENT_LISTEN_EVENTS.PAIRED_CHAT_STARTED,
        ({ chatId, studentPair }) => {
          setStudentChats((chats) => [
            ...chats,
            {
              mode: PAIRED,
              chatId,
              studentPair,
              conversation: [],
              isCompleted: false,
            },
          ]);
        },
      );
    }

    socket.on(CLIENT_LISTEN_EVENTS.STUDENT_DISCONNECTED_FROM_SOLO_CHAT, ({ chatId }) => {
      markChatAsCompletedById({ chatId });
    });

    return () => {
      if (socket) {
        socket.off(CLIENT_LISTEN_EVENTS.PAIRED_CHAT_STARTED);
        socket.off(CLIENT_LISTEN_EVENTS.STUDENT_DISCONNECTED_FROM_SOLO_CHAT);
      }
    };
  }, [markChatAsCompletedById, socket]);

  useEffect(() => {
    if (socket) {
      socket.on(CLIENT_LISTEN_EVENTS.PAIRED_CHAT_ENDED, markChatAsCompletedById);
      socket.on(CLIENT_LISTEN_EVENTS.STUDENT_ENDED_CHAT, markChatAsCompletedById);

      socket.on(
        CLIENT_LISTEN_EVENTS.STUDENT_SENT_PAIRED_MESSAGE_TO_TEACHER,
        ({ message, sessionId, chatId }) => {
          setStudentChats((studentChats) => {
            return studentChats.map((chat) => {
              if (chat.chatId === chatId && chat.mode === PAIRED) {
                const student1 = chat.studentPair[0];
                const messageAuthor =
                  student1.sessionId === sessionId ? 'student1' : 'student2';
                const newMessage: ChatMessage = [messageAuthor, message];
                return {
                  ...chat,
                  conversation: [...chat.conversation, newMessage],
                };
              } else return chat;
            });
          });
        },
      );

      socket.on(
        CLIENT_LISTEN_EVENTS.SOLO_CHAT_MESSAGES_ADDED,
        ({ messages, chatId }) => {
          setStudentChats((studentChats) => {
            return studentChats.map((chat) => {
              if (chat.chatId === chatId && chat.mode === 'SOLO') {
                return {
                  ...chat,
                  conversation: [...chat.conversation, ...messages],
                };
              } else return chat;
            });
          });
        },
      );
    }

    const handleRouteChange = () => {
      socket.emit(CLIENT_EMIT_EVENTS.TEACHER_LEAVE_ACTIVITY);
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      socket.off(CLIENT_LISTEN_EVENTS.PAIRED_CHAT_ENDED, markChatAsCompletedById);
      socket.off(CLIENT_LISTEN_EVENTS.STUDENT_ENDED_CHAT, markChatAsCompletedById);
      socket.off(CLIENT_LISTEN_EVENTS.STUDENT_SENT_PAIRED_MESSAGE_TO_TEACHER);
      socket.off(CLIENT_LISTEN_EVENTS.SOLO_CHAT_MESSAGES_ADDED);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [markChatAsCompletedById, router.events, socket]);

  if (!isConnected) {
    return (
      <Box my={10}>
        <Typography variant='h4' textAlign='center'>
          You are no longer connected to this activity on Frempco. Return to the{' '}
          <Link href='/'>Frempco homepage</Link> and start another activity.
        </Typography>
      </Box>
    );
  }

  const importantStudentTotalsText = (
    <Typography variant='h4'>
      Students waiting to chat: <strong>{unpairedStudents.length}</strong>
    </Typography>
  );

  return (
    <main>
      <PageHeader
        leftElement={importantStudentTotalsText}
        statusText={'Activity in Progress'}
        isSticky={true}
      />

      <Box mx={2} mt={2}>
        <Box mb={3}>
          <Typography variant='h5' mb={1}>
            Student Instructions
          </Typography>
          <Typography variant='body2' mb={1}>
            Write the following on your blackboard or another highly visible
            spot for all students to see.
          </Typography>
          <Typography variant='body1' mb={1}>
            {'1)'} Join at <strong>www.frempco.com</strong>
          </Typography>
          <Typography variant='body1' mb={1}>
            {'2)'} Enter Activity PIN: <strong>{activityPin}</strong>
          </Typography>
        </Box>
        <SetupActivityAccordion
          activityPin={activityPin}
          characters={characters}
          setCharacters={setCharacters}
          email={email}
          setEmail={setEmail}
        />
        <UnpairedStudentsAccordion
          socket={socket}
          unpairedStudents={unpairedStudents}
          setUnpairedStudents={setUnpairedStudents}
          setStudentChats={setStudentChats}
          characters={characters}
          lastPairedPartnerBySessionId={lastPairedPartnerBySessionId}
        />
        <ChatsInProgressAccordion
          activeStudentChats={activeChats}
          setStudentChats={setStudentChats}
          markChatAsCompleted={markChatAsCompleted}
          markAllChatsAsCompleted={markAllChatsAsCompleted}
        />
        <CompletedChatsAccordion completedStudentChats={completedChats} />
      </Box>
    </main>
  );
}
