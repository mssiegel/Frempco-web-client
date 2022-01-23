import { useContext, useState } from 'react';
import {
  Button,
  Divider,
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

export default function TeachersPage({ classroomName }: ClassroomProps) {
  const socket = useContext(SocketContext);

  const [pairedStudents, setPairedStudents] = useState<StudentPair[]>([]);

  function displayChat() {
    console.log('display chat clicked');
  }

  return (
    <main>
      <Typography variant='h4' sx={{ color: 'white' }}>
        Hello teacher! Welcome to your classroom: {classroomName}
      </Typography>
      <Typography variant='h4' sx={{ color: 'white' }}>
        Your socket ID is {socket?.id ?? 'NO SOCKET FOUND'}
      </Typography>

      <ActivateButton socket={socket} classroomName={classroomName} />

      <UnpairedStudentsList
        socket={socket}
        setPairedStudents={setPairedStudents}
      />

      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          my: 5,
          bgcolor: 'background.paper',
        }}
        subheader={
          <ListSubheader component='div'>
            Total paired students: {pairedStudents.length * 2}
          </ListSubheader>
        }
      >
        {pairedStudents.map(([student1, student2]) => (
          <div key={student1.socketId + student2.socketId}>
            <Divider />
            <ListItemText
              inset
              primary={student1.realName + ' & ' + student2.realName}
            />
            <ListItemText
              inset
              primary={
                <Button size='small' onClick={displayChat}>
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
