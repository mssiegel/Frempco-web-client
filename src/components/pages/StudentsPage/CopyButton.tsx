/** @jsxImportSource @emotion/react */

import { Fab } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';

export default function CopyButton({ elementId }) {
  const copyToClipboard = () => {
    const temp = document.createElement('div');
    temp.setAttribute('contentEditable', 'true');
    temp.innerHTML = document.getElementById(elementId).innerHTML;
    document.body.appendChild(temp);
    temp.setAttribute(
      'onfocus',
      "document.execCommand('selectAll',false,null)",
    );
    temp.focus();
    document.execCommand('copy');
    document.body.removeChild(temp);
    alert('Conversation copied to clipboard');
  };
  return (
    <>
      <Fab
        variant='extended'
        size='small'
        color='primary'
        style={{
          marginBottom: '10px',
          background: '#940000',
          textTransform: 'none',
        }}
        onClick={copyToClipboard}
      >
        <ContentCopyIcon />
        &nbsp;Copy chat
      </Fab>
    </>
  );
}
