import { Grid, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { Student } from '@utils/classrooms';
import { StudentChat, SoloChat } from './index';
import ReadOnlyChatbox from './Chatbox/ReadOnlyChatbox';

interface AllStudentChatsDisplayProps {
  studentChats: (StudentChat | SoloChat)[];
  displayedChat: string;
  setDisplayedChat: Dispatch<SetStateAction<string>>;
  setStudentChats: Dispatch<SetStateAction<(StudentChat | SoloChat)[]>>;
  setUnpairedStudents: Dispatch<SetStateAction<Student[]>>;
}

export default function AllStudentChatsDisplay({
  studentChats,
  displayedChat,
  setDisplayedChat,
  setStudentChats,
  setUnpairedStudents,
}: AllStudentChatsDisplayProps) {
  return (
    <Grid
      container
      spacing={2}
      mt={2}
      pb={2}
      sx={{ borderTop: '2px dashed silver' }}
    >
      <Grid item xs={12}>
        <Typography variant='h5' color='black'>
          Click any conversation below to display full chat above
        </Typography>
      </Grid>
      {studentChats.map((chat, i) => {
        return (
          <Grid
            key={i}
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => setDisplayedChat(chat.chatId)}
          >
            <ReadOnlyChatbox
              chat={chat}
              isSelected={chat.chatId === displayedChat}
              setStudentChats={setStudentChats}
              setUnpairedStudents={setUnpairedStudents}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
