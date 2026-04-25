import { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { PAIRED } from '@utils/activities';
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
  wasCharactersUpdated: boolean;
}

export default function InProgressActivity({
  activityPin,
  characters,
  setCharacters,
  email,
  setEmail,
  wasCharactersUpdated,
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

  const { activeChats, completedChats } = useMemo(() => {
    const activeChats = [];
    const completedChats = [];
    for (const chat of studentChats) {
      if (chat.isCompleted) completedChats.push(chat);
      else activeChats.push(chat);
    }
    return { activeChats, completedChats };
  }, [studentChats]);

  function markChatAsCompleted({ chatId }: { chatId: string }) {
    setStudentChats((chats) =>
      chats.map((chat) =>
        chat.chatId === chatId ? { ...chat, isCompleted: true } : chat,
      ),
    );
  }

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
      socket.on('chat started - two students', ({ chatId, studentPair }) => {
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
      });
    }

    socket.on('solo mode: student disconnected', ({ chatId }) => {
      setStudentChats((chats) =>
        chats.map((chat) =>
          chat.chatId === chatId ? { ...chat, isCompleted: true } : chat,
        ),
      );
    });

    return () => {
      if (socket) {
        socket.off('chat started - two students');
        socket.off('solo mode: student disconnected');
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('chat ended - two students', markChatAsCompleted);
      socket.on('teacher:student-ended-chat', markChatAsCompleted);

      socket.on(
        'teacher listens to student message',
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
        'solo mode: teacher listens to new message',
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
      socket.emit('user disconnected');
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      socket.off('chat ended - two students', markChatAsCompleted);
      socket.off('teacher:student-ended-chat', markChatAsCompleted);
      socket.off('teacher listens to student message');
      socket.off('solo mode: teacher listens to new message');
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, socket]);

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
          <Typography variant='body2' sx={{ mt: 2 }}>
            Note: Your students on smartphones will be logged out of Frempco if
            their smartphone screen goes dark.
          </Typography>
        </Box>
        <SetupActivityAccordion
          activityPin={activityPin}
          characters={characters}
          setCharacters={setCharacters}
          wasCharactersUpdated={wasCharactersUpdated}
          email={email}
          setEmail={setEmail}
        />
        <UnpairedStudentsAccordion
          socket={socket}
          unpairedStudents={unpairedStudents}
          setUnpairedStudents={setUnpairedStudents}
          setStudentChats={setStudentChats}
          characters={characters}
        />
        <ChatsInProgressAccordion
          activeStudentChats={activeChats}
          setStudentChats={setStudentChats}
        />
        <CompletedChatsAccordion completedStudentChats={completedChats} />
      </Box>
    </main>
  );
}
