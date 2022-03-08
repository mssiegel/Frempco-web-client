/** @jsxImportSource @emotion/react */

import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton, ListItem, ListItemText } from '@mui/material';
import unpairedStudentsCSS from './UnpairedStudentsList.css';

export default function UnpairedStudentItem({ params }) {
  return (
    <>
      <ListItem
        sx={{ margin: 0, padding: 0 }}
        secondaryAction={
          <IconButton
            edge='end'
            aria-label='delete'
            size='small'
            sx={{ ':hover': { bgcolor: '#ff0000ad' } }}
            onClick={() => params.removeStudent(params.student)}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        <ListItemText
          inset
          primary={params.student.realName}
          sx={{ margin: 0, padding: 1, paddingLeft: 3 }}
          css={
            params.unpairedStudents.length > 1 &&
            unpairedStudentsCSS.studentName
          }
          onClick={() => params.swapUnpairedStudent(params.i)}
        />
      </ListItem>
    </>
  );
}
