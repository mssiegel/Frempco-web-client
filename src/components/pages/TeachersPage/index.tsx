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

import { ClassroomProps, Student } from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import UnpairedStudentsList from './UnpairedStudentsList';
import ActivateButton from './ActivateButton';

type StudentPair = [Student, Student];

interface StudentChat {
  chatId: string;
  studentPair: StudentPair;
}

export default function TeachersPage({ classroomName }: ClassroomProps) {
  const socket = useContext(SocketContext);
  console.log('socketId:', socket?.id ?? 'No socket found');

  const [displayedChat, setDisplayedChat] = useState('');
  const [studentChats, setStudentChats] = useState<StudentChat[]>([
    // {
    //   chatId: 'as343da11sf#as31afdsf',
    //   studentPair: [
    //     { socketId: 'as343da11sf', realName: 'Sam', character: 'pirate' },
    //     { socketId: 'as31afdsf', realName: 'Rachel', character: 'dentist' },
    //   ],
    // },
  ]);

  useEffect(() => {
    if (socket) {
      socket.on('chat started - two students', ({ chatId, studentPair }) => {
        setStudentChats((chats) => [...chats, { chatId, studentPair }]);
      });
    }

    return () => {
      if (socket) socket.off('chat started - two students');
    };
  });

  function showDisplayedChat() {
    console.log('display chat clicked');
    const chat = studentChats.find((chat) => chat.chatId === displayedChat);
    if (!chat) return null;

    const [student1, student2] = chat.studentPair;

    // TODO NEXT: Turn this into a real chatbox!!
    return (
      <div>
        <p style={{ color: 'white' }}>
          Student 1: {student1.realName} ({student1.character})
          <br />
          Student 2: {student2.realName} ({student2.character})
        </p>
      </div>
    );
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
          <Typography variant='h4'>
            Displayed student chatbox will go here!
            {showDisplayedChat()}
          </Typography>
        </Grid>
      </Grid>

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          my: 5,
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
    </main>
  );
}
