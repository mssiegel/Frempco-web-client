import { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

import { ClassroomProps, Student, currentTime } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox';
import UnpairedStudentsList from './UnpairedStudentsList';
import PairedStudentsList from './PairedStudentsList';
import ActivateButton from './ActivateButton';

type StudentPair = [Student, Student];

type ChatMessage = ['student1' | 'student2', string, string];

interface StudentChat {
  chatId: string;
  studentPair: StudentPair;
  conversation: ChatMessage[];
  startTime: string;
}

export default function TeachersPage({ classroomName }: ClassroomProps) {
  const socket = useContext(SocketContext);
  console.log('Teacher socketId:', socket?.id ?? 'No socket found');

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

      socket.on('chat ended - two students', ({ chatId }) => {
        setStudentChats((chats) =>
          chats.filter((chat) => chat.chatId !== chatId),
        );
      });

      socket.on(
        'student chat message',
        ({ character, message, socketId, chatId }) => {
          const chats = [...studentChats];
          const chat = chats.find((chat) => chat.chatId === chatId);
          if (!chat) return;

          const student =
            chat.studentPair[0].socketId === socketId ? 'student1' : 'student2';
          chat.conversation = [
            ...chat.conversation,
            [student, character, message],
          ];
          setStudentChats(chats);
        },
      );
    }

    return () => {
      if (socket) {
        socket.off('chat started - two students');
        socket.off('chat ended - two students');
        socket.off('student chat message');
      }
    };
  });

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
          <UnpairedStudentsList socket={socket} />
          <PairedStudentsList
            studentChats={studentChats}
            setDisplayedChat={setDisplayedChat}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          {showDisplayedChat()}
        </Grid>
      </Grid>
    </main>
  );
}
