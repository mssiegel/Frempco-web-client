import { TextField } from '@mui/material';

export default function ModalTextField({
  label,
  refObject,
  autoFocus = false,
  type = 'input',
  maxLength = 100,
  defaultValue = '',
  required = false,
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
      inputProps={{ maxLength }}
      defaultValue={defaultValue}
      required={required}
    />
  );
}
