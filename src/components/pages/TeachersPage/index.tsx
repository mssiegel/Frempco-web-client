import { useContext, useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import {
  ClassroomProps,
  Student,
  currentTime,
  PAIRED,
  SOLO,
} from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox/Chatbox';
import UnpairedStudentsList from './UnpairedStudentsList';
import PairedStudentsList from './PairedStudentsList';
import ActivateButton from './ActivateButton';
import SetTeacherEmailButton from './SetTeacherEmailButton';
import AllStudentChatsDisplay from './AllStudentChatsDisplay';
import { useRouter } from 'next/router';

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

interface SoloChat {
  mode: typeof SOLO;
  chatId: string;
  student: Student;
  conversation: SoloChatMessage[];
  startTime: string;
}

export default function TeachersPage({ classroomName }: ClassroomProps) {
  const router = useRouter();

  const socket = useContext(SocketContext);
  console.log('Teacher socketId:', socket?.id ?? 'No socket found');

  const [unpairedStudents, setUnpairedStudents] = useState<Student[]>([]);
  const [displayedChat, setDisplayedChat] = useState('');
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
  const [isActiveClassroom, setIsActiveClassroom] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on('chat started - two students', ({ chatId, studentPair }) => {
        if (studentChats.length === 0) setDisplayedChat(chatId);
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

  function showDisplayedChat() {
    const chat = studentChats.find((chat) => chat.chatId === displayedChat);
    if (!chat) return null;

    return (
      <Chatbox
        socket={socket}
        chat={chat}
        isTheDisplayedChat={true}
        inAllStudentChatsDisplay={false}
        setStudentChats={setStudentChats}
      />
    );
  }

  return (
    <main>
      <Box mx={2}>
        <Typography fontSize={20} color='black'>
          To join this classroom:
        </Typography>
        <Typography fontSize={20} color='black' ml={4}>
          1. Go to <strong>www.frempco.com</strong>
        </Typography>
        <Typography fontSize={20} color='black' ml={4}>
          2. Click the blue button named{' '}
          <strong>&quot;Student: Join classroom&quot;</strong>
        </Typography>
        <Typography fontSize={20} color='black' ml={4}>
          3. Enter PIN <strong>{classroomName}</strong>
        </Typography>

        <ActivateButton
          socket={socket}
          classroomName={classroomName}
          isActiveClassroom={isActiveClassroom}
          setIsActiveClassroom={setIsActiveClassroom}
        />
        <SetTeacherEmailButton
          classroomName={classroomName}
          isActiveClassroom={isActiveClassroom}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <UnpairedStudentsList
              socket={socket}
              unpairedStudents={unpairedStudents}
              setUnpairedStudents={setUnpairedStudents}
              setStudentChats={setStudentChats}
              studentChats={studentChats}
              setDisplayedChat={setDisplayedChat}
            />
            <PairedStudentsList
              studentChats={studentChats}
              setDisplayedChat={setDisplayedChat}
              displayedChat={displayedChat}
              setStudentChats={setStudentChats}
              setUnpairedStudents={setUnpairedStudents}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            {showDisplayedChat()}
          </Grid>
        </Grid>
        <AllStudentChatsDisplay
          studentChats={studentChats}
          displayedChat={displayedChat}
          setDisplayedChat={setDisplayedChat}
        />
      </Box>
    </main>
  );
}
