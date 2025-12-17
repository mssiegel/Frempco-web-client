import { Grid } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { Student } from '@utils/classrooms';
import { StudentChat, SoloChat } from './index';
import ReadOnlyChatbox from './ReadOnlyChatbox';

interface AllStudentChatsDisplayProps {
  studentChats: (StudentChat | SoloChat)[];
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  setUnpairedStudents: Dispatch<SetStateAction<Student[]>>;
}

export default function AllStudentChatsDisplay({
  studentChats,
  setStudentChats,
  setUnpairedStudents,
}: AllStudentChatsDisplayProps) {
  return (
    <Grid container spacing={2} mt={2} pb={2}>
      {studentChats.map((chat, i) => {
        return (
          <Grid key={i} item xs={12} md={6} lg={4}>
            <ReadOnlyChatbox
              chat={chat}
              setStudentChats={setStudentChats}
              setUnpairedStudents={setUnpairedStudents}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
