/** @jsxImportSource @emotion/react */

import { Box, Fab, FormControl, TextField } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

import sendMessagesCSS from './SendMessages.css';

export default function SendMessages({}) {
  function sendMessage() {
    console.log('sendMessages form submitted!!');
  }

  return (
    <Box>
      {/* TODO: Make these send message inputs display better */}
      <FormControl onSubmit={sendMessage}>
        <TextField
          defaultValue='vampire'
          placeholder='Your character'
          inputProps={{ maxLength: 30 }}
        />
        <TextField
          defaultValue='you can??'
          placeholder='Say something'
          inputProps={{ maxLength: 75 }}
        />
        <Fab
          size='small'
          type='submit'
          color='primary'
          style={{ background: '#940000' }}
        >
          <SendIcon />
        </Fab>
      </FormControl>
    </Box>
  );
}
