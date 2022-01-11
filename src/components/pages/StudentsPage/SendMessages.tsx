/** @jsxImportSource @emotion/react */

import { Box, Fab } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

import sendMessagesCSS from './SendMessages.css';

export default function SendMessages({}) {
  function sendMessage(e) {
    e.preventDefault();
    console.log('sendMessages form submitted!!');
  }

  return (
    <Box>
      <form onSubmit={sendMessage}>
        <input
          css={sendMessagesCSS.characterName}
          defaultValue='vampire'
          placeholder='Your character'
          maxLength={30}
        />
        <input
          css={sendMessagesCSS.message}
          defaultValue='you can??'
          placeholder='Say something'
          maxLength={75}
        />
        <Fab
          size='small'
          type='submit'
          color='primary'
          style={{ marginLeft: '10px', background: '#940000' }}
        >
          <SendIcon />
        </Fab>
      </form>
    </Box>
  );
}
