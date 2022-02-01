import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  List,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';

import { ClassroomProps, Student, currentTime } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import Chatbox from './Chatbox';
import UnpairedStudentsList from './UnpairedStudentsList';
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
        setStudentChats((chats) => [
          ...chats,
          { chatId, studentPair, conversation: [], startTime: currentTime() },
        ]);
      });

      socket.on(
        'student chat message',
        ({ character, message, socketId, chatId }) => {
          const chats = [...studentChats];
          const chat = chats.find((chat) => chat.chatId === chatId);
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
        </Grid>

        <Grid item xs={12} md={7}>
          {showDisplayedChat()}
        </Grid>
      </Grid>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          mt: 5,
          bgcolor: 'background.paper',
        }}
        subheader={
          <ListSubheader component='div'>
            Total paired students: {studentChats.length * 2}
          </ListSubheader>
        }
      >
        {studentChats.map(({ chatId, studentPair: [student1, student2] }) => (
          <div key={chatId}>
            <Divider />
            <ListItemText
              inset
              primary={student1.realName + ' & ' + student2.realName}
            />
            <ListItemText
              inset
              primary={
                <Button size='small' onClick={() => setDisplayedChat(chatId)}>
                  Display chat
                </Button>
              }
            />
          </div>
        ))}
      </List>
      <br />
    </main>
  );
}
