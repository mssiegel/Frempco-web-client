import * as React from 'react';
import Box from '@mui/material/Box';
import { Modal, TextField } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  );
}

export const genTextField = ({
  label,
  ref,
  autoFocus = false,
  type = 'input',
}) => {
  return (
    <>
      <TextField
        fullWidth
        margin='normal'
        label={label}
        variant='outlined'
        type={type}
        autoComplete='off'
        inputRef={ref}
        autoFocus={autoFocus}
      />
    </>
  );
};
