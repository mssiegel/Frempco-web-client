import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import {
  ClassroomProps,
  Student,
  currentTime,
  PAIRED,
  SOLO,
} from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { useRouter } from 'next/router';
import UnpairedStudentsAccordion from './UnpairedStudentsAccordion';
import SetupClassroomAccordion from './SetupClassroomAccordion';
import ChatsInProgressAccordion from './ChatsInProgressAccordion';
import Link from '@components/shared/Link';

const CHARACTERS = [
  'Perfectionist dentist',
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

type StudentPair = [Student, Student];

export type ChatMessage = ['student1' | 'student2' | 'teacher', string];

export type SoloChatMessage = ['student' | 'chatbot' | 'teacher', string];

export interface StudentChat {
  mode: typeof PAIRED;
  chatId: string;
  studentPair: StudentPair;
  conversation: ChatMessage[];
  startTime: string;
}

export interface SoloChat {
  mode: typeof SOLO;
  chatId: string;
  student: Student;
  conversation: SoloChatMessage[];
  startTime: string;
}

export default function TeachersPage({ classroomName }: ClassroomProps) {
  const router = useRouter();
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const TEN_SECONDS = 10000;
  const [isConnected, setIsConnected] = useState(true);

  const socket = useContext(SocketContext);
  console.log('Teacher socketId:', socket?.id ?? 'No socket found');

  const [unpairedStudents, setUnpairedStudents] = useState<Student[]>([]);
  const [characters, setCharacters] = useState(CHARACTERS);
  const [studentChats, setStudentChats] = useState<(StudentChat | SoloChat)[]>([
    // {
    //   mode: PAIRED,
    //   chatId: 'as343da11sf#as31afdsf',
    //   studentPair: [
    //     { socketId: 'as343da11sf', realName: 'Sam', character: 'pirate' },
    //     { socketId: 'as31afdsf', realName: 'Rachel', character: 'dentist' },
    //   ],
    //   conversation: [
    //     ['student1', 'i need blood'],
    //     ['student2', 'i will cast a spell to make some'],
    //   ],
    //   startTime: '',
    // },
  ]);

  const wasCharactersUpdated = JSON.stringify(characters) !== JSON.stringify(CHARACTERS);

  useEffect(() => {
    // Check if the teacher is still connected to the classroom every 10 seconds
    const connectionCheckInterval = setInterval(async () => {
      try {
        const getResponse = await fetch(
          `${apiUrl}/classrooms/${classroomName}`,
          { method: 'GET' },
        );
        const { isActive } = await getResponse.json();
        if (!isActive) {
          setIsConnected(false);
          clearInterval(connectionCheckInterval);
        }
      } catch (error) {
        // If the request fails, assume the connection was lost
        setIsConnected(false);
        clearInterval(connectionCheckInterval);
      }
    }, TEN_SECONDS);

    return () => clearInterval(connectionCheckInterval);
  }, []);

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
            startTime: currentTime(),
          },
        ]);
      });
    }

    socket.on('solo mode: student disconnected', ({ chatId }) => {
      setStudentChats((chats) =>
        chats.filter((chat) => chat.chatId !== chatId),
      );
    });

    return () => {
      if (socket) {
        socket.off('chat started - two students');
        socket.off('solo mode: student disconnected');
      }
    };
  }, [socket, studentChats.length]);

  useEffect(() => {
    if (socket) {
      socket.on('chat ended - two students', ({ chatId, student2 }) => {
        // remove the chat
        setStudentChats((chats) =>
          chats.filter((chat) => chat.chatId !== chatId),
        );

        // add the student who remains back into unpaired student list
        setUnpairedStudents((unpaired) => [...unpaired, student2]);
      });

      socket.on(
        'teacher listens to student message',
        ({ message, socketId, chatId }) => {
          setStudentChats((studentChats) => {
            return studentChats.map((chat) => {
              if (chat.chatId === chatId && chat.mode === PAIRED) {
                const student1 = chat.studentPair[0];
                const messageAuthor =
                  student1.socketId === socketId ? 'student1' : 'student2';
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

    const handleRouteChange = (url, { shallow }) => {
      socket.emit('user disconnected');
    };
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      socket.off('chat ended - two students');
      socket.off('teacher listens to student message');
      socket.off('solo mode: teacher listens to new message');
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, socket]);

  if (!isConnected) {
    return (
      <Box my={10}>
        <Typography variant='h4' textAlign='center'>
          You are no longer connected to this classroom on Frempco. Return to
          the <Link href='/'>Frempco homepage</Link> and restart your classroom.
        </Typography>
      </Box>
    );
  }

  return (
    <main>
      <Box mx={2}>
        <Box mb={3}>
          <Typography fontSize={26} fontFamily='Lora'>
            Student Instructions
          </Typography>
          <Typography fontSize={17} fontFamily='Lora' mb={2}>
            Write the following on your blackboard or another highly visible
            spot for all students to see.
          </Typography>
          <Typography fontSize={21} fontFamily='Lora' fontWeight='bold' mb={1}>
            {'1)'} Join at www.frempco.com
          </Typography>
          <Typography fontSize={21} fontFamily='Lora' fontWeight='bold' mb={1}>
            {'2)'} Enter Game Pin: {classroomName}
          </Typography>
        </Box>
        <SetupClassroomAccordion
          classroomName={classroomName}
          characters={characters}
          setCharacters={setCharacters}
          wasCharactersUpdated={wasCharactersUpdated}
        />
        <UnpairedStudentsAccordion
          socket={socket}
          unpairedStudents={unpairedStudents}
          setUnpairedStudents={setUnpairedStudents}
          setStudentChats={setStudentChats}
          studentChats={studentChats}
          characters={characters}
        />
        <ChatsInProgressAccordion
          studentChats={studentChats}
          setStudentChats={setStudentChats}
          setUnpairedStudents={setUnpairedStudents}
        />
      </Box>
    </main>
  );
}
