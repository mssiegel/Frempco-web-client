/** @jsxImportSource @emotion/react */

import { Box, Fab } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';

import chatboxCSS from './Chatbox.css';
import Conversation from './Conversation';
import SendMessages from './SendMessages';

export default function Chatbox({ socket, chat, setChat }) {
  const copyToClipboard = (elementId) => {
    let temp = document.createElement('div');
    temp.setAttribute('contentEditable', 'true');
    temp.innerHTML = document.getElementById(elementId).innerHTML;
    temp.setAttribute(
      'onfocus',
      "document.execCommand('selectAll',false,null)",
    );
    document.body.appendChild(temp);
    temp.focus();
    document.execCommand('copy');
    document.body.removeChild(temp);
    alert('Conversation copied to clipboard');
  };

  return (
    <Box css={chatboxCSS.chatboxContainer}>
      <Fab
        variant='extended'
        size='small'
        color='primary'
        style={{
          marginBottom: '10px',
          background: '#940000',
          textTransform: 'none',
        }}
        onClick={() => copyToClipboard('conversation')}
      >
        Copy chat
        <ContentCopyIcon />
      </Fab>
      <Box css={chatboxCSS.chatboxTop}>
        <Conversation socket={socket} chat={chat} setChat={setChat} />
      </Box>
      <Box css={chatboxCSS.chatboxBottom}>
        <SendMessages socket={socket} chat={chat} setChat={setChat} />
      </Box>
    </Box>
  );
}
