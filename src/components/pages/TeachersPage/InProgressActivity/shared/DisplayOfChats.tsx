import { Grid } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { StudentChat, SoloChat } from '../../types';
import Chatbox from '../Chatbox';

interface DisplayOfChatsProps {
  studentChats: (StudentChat | SoloChat)[];
  setStudentChats?: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
}

export default function DisplayOfChats({
  studentChats,
  setStudentChats,
}: DisplayOfChatsProps) {
  return (
    <Grid container spacing={2} mt={2} pb={2}>
      {studentChats.map((chat) => {
        return (
          <Grid key={chat.chatId} item xs={12} md={6} lg={4}>
            <Chatbox chat={chat} setStudentChats={setStudentChats} />
          </Grid>
        );
      })}
    </Grid>
  );
}
