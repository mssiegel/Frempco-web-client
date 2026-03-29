import { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { PAIRED } from '@utils/classrooms';
import { ChatMessage, SoloChat, Student, StudentChat } from '../types';
import { SocketContext } from '@contexts/SocketContext';
import { useRouter } from 'next/router';
import UnpairedStudentsAccordion from './UnpairedStudentsAccordion';
import SetupClassroomAccordion from './SetupClassroomAccordion';
import ChatsInProgressAccordion from './ChatsInProgressAccordion';

interface ActiveGameRoomProps {
  classroomName: string;
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  wasCharactersUpdated: boolean;
}

export default function ActiveGameRoom({
  classroomName,
  characters,
  setCharacters,
  email,
  setEmail,
  wasCharactersUpdated,
}: ActiveGameRoomProps): JSX.Element {
  const router = useRouter();
  const socket = useContext(SocketContext);

  console.log('Teacher socketId:', socket?.id ?? 'No socket found');

  const [unpairedStudents, setUnpairedStudents] = useState<Student[]>([]);
  const [studentChats, setStudentChats] = useState<(StudentChat | SoloChat)[]>(
    [],
  );

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
        setStudentChats((chats) =>
          chats.filter((chat) => chat.chatId !== chatId),
        );

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

    const handleRouteChange = () => {
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

  return (
    <main>
      <Box mx={2}>
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
            {'2)'} Enter Game Pin: <strong>{classroomName}</strong>
          </Typography>
          <Typography variant='body2' sx={{ mt: 2 }}>
            Note: Your students on smartphones will be logged out of Frempco if
            their smartphone screen goes dark.
          </Typography>
        </Box>
        <SetupClassroomAccordion
          classroomName={classroomName}
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
          studentChats={studentChats}
          setStudentChats={setStudentChats}
          setUnpairedStudents={setUnpairedStudents}
        />
      </Box>
    </main>
  );
}
