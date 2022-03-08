import { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { ClassroomProps, Student, currentTime } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox';
import UnpairedStudentsList from './UnpairedStudentsList';
import PairedStudentsList from './PairedStudentsList';
import ActivateButton from './ActivateButton';
import { useRouter } from 'next/router';

type StudentPair = [Student, Student];

type ChatMessage = ['student1' | 'student2', string, string];

interface StudentChat {
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
    }

    return () => {
      if (socket) {
        socket.off('chat started - two students');
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
        'student chat message',
        ({ character, message, socketId, chatId }) => {
          setStudentChats((studentChats) => {
            const chats = [...studentChats];
            const chatIndex = chats.findIndex((chat) => chat.chatId === chatId);
            if (chatIndex === -1) return studentChats;

            const chat = chats[chatIndex];

            const student =
              chat.studentPair[0].socketId === socketId
                ? 'student1'
                : 'student2';

            const newMessage: ChatMessage = [student, character, message];

            const updatedChat = {
              ...chat,
              conversation: [...chat.conversation, newMessage],
            };

            chats[chatIndex] = updatedChat;

            return chats;
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
      socket.off('student chat message');
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, socket]);

  function showDisplayedChat() {
    const chat = studentChats.find((chat) => chat.chatId === displayedChat);
    if (!chat) return null;

    return <Chatbox chat={chat} />;
  }

  return (
    <main>
      <Typography variant='h4' sx={{ color: 'white' }}>
        Hello teacher! Welcome to your classroom: {classroomName}
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
    </main>
  );
}
