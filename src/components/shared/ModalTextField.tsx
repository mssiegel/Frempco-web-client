import { TextField } from '@mui/material';

export default function ModalTextField({
  label,
  refObject,
  autoFocus = false,
  type = 'input',
}) {
  return (
    <TextField
      fullWidth
      margin='normal'
      label={label}
      variant='outlined'
      type={type}
      autoComplete='off'
      inputRef={refObject}
      autoFocus={autoFocus}
    />
  );
}
