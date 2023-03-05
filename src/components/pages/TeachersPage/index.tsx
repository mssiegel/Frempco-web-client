import { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { ClassroomProps, Student, currentTime } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox';
import UnpairedStudentsList from './UnpairedStudentsList';
import PairedStudentsList from './PairedStudentsList';
import ActivateButton from './ActivateButton';
import AllStudentChatsDisplay from './AllStudentChatsDisplay';
import { useRouter } from 'next/router';

type StudentPair = [Student, Student];

export type ChatMessage = ['student1' | 'student2' | 'teacher', string, string];

export interface StudentChat {
  chatId: string;
  studentPair: StudentPair;
  conversation: ChatMessage[];
  startTime: string;
}

export default function TeachersPage({ classroomName }: ClassroomProps) {
  const router = useRouter();

  const socket = useContext(SocketContext);
  console.log('Teacher socketId:', socket?.id ?? 'No socket found');

  const [unpairedStudents, setUnpairedStudents] = useState<Student[]>([]);
  const [displayedChat, setDisplayedChat] = useState('');
  const [studentChats, setStudentChats] = useState<StudentChat[]>([
    // {
    //   chatId: 'as343da11sf#as31afdsf',
    //   studentPair: [
    //     { socketId: 'as343da11sf', realName: 'Sam', character: 'pirate' },
    //     { socketId: 'as31afdsf', realName: 'Rachel', character: 'dentist' },
    //   ],
    //   conversation: [
    //     ['student1', 'vampire', 'i need blood'],
    //     ['student2', 'wizard', 'i will cast a spell to make some'],
    //   ],
    //   startTime: '',
    // },
  ]);

  useEffect(() => {
    if (socket) {
      socket.on('chat started - two students', ({ chatId, studentPair }) => {
        if (studentChats.length === 0) setDisplayedChat(chatId);
        setStudentChats((chats) => [
          ...chats,
          { chatId, studentPair, conversation: [], startTime: currentTime() },
        ]);
      });

      socket.on('student chat unpaired', ({ chatId, student1, student2 }) => {
        setStudentChats((chats) =>
          chats.filter((chat) => chat.chatId !== chatId),
        );
        setUnpairedStudents((unpaired) => [...unpaired, student1, student2]);
      });
    }

    return () => {
      if (socket) {
        socket.off('chat started - two students');
        socket.off('student chat unpaired');
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
        ({ character, message, socketId, chatId }) => {
          setStudentChats((studentChats) => {
            return studentChats.map((chat) => {
              if (chat.chatId === chatId) {
                const student =
                  chat.studentPair[0].socketId === socketId
                    ? 'student1'
                    : 'student2';
                const newMessage: ChatMessage = [student, character, message];
                return {
                  ...chat,
                  conversation: [...chat.conversation, newMessage],
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
      <Typography variant='h4' sx={{ color: 'white' }}>
        To join this classroom, go to <strong>www.frempco.com</strong>, click
        the <strong>Student Login</strong> button, and enter PIN{' '}
        <strong>{classroomName}</strong>
      </Typography>

      <ActivateButton socket={socket} classroomName={classroomName} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <UnpairedStudentsList
            socket={socket}
            unpairedStudents={unpairedStudents}
            setUnpairedStudents={setUnpairedStudents}
          />
          <PairedStudentsList
            studentChats={studentChats}
            setDisplayedChat={setDisplayedChat}
            displayedChat={displayedChat}
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
    </main>
  );
}
