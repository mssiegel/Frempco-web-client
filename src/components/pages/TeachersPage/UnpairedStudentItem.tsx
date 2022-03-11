/** @jsxImportSource @emotion/react */

import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import unpairedStudentsCSS from './UnpairedStudentsList.css';

export default function UnpairedStudentItem({
  i,
  student,
  socket,
  setUnpairedStudents,
  unpairedStudents,
  swapUnpairedStudent,
}) {
  function removeStudent(student) {
    const removeConfirmed = confirm(
      `Are you sure you want to remove ${student.realName} ?`,
    );
    if (removeConfirmed)
      setUnpairedStudents((students) =>
        students.filter((s) => s.socketId !== student.socketId),
      );
    socket.emit('remove student from classroom', student);
  }

  return (
    <>
      <ListItem
        sx={{ p: 0 }}
        secondaryAction={
          <IconButton
            aria-label='delete'
            size='small'
            sx={{ ':hover': { bgcolor: '#ff0000ad' } }}
            onClick={() => removeStudent(student)}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        <ListItemText
          primary={student.realName}
          sx={{ m: 0, p: 1, pl: 3 }}
          css={unpairedStudents.length > 1 && unpairedStudentsCSS.studentName}
          onClick={() => swapUnpairedStudent(i)}
        />
      </ListItem>
    </>
  );
}
