/** @jsxImportSource @emotion/react */

import { Button } from '@mui/material';
import { ContentCopy as ContentCopyIcon } from '@mui/icons-material';

interface CopyButtonProps {
  elementId: string;
  isTeachersPage?: boolean;
}

export default function CopyButton({
  elementId,
  isTeachersPage,
}: CopyButtonProps) {
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
      <Button
        size='medium'
        color='secondary'
        variant='contained'
        startIcon={<ContentCopyIcon />}
        onClick={copyToClipboard}
      >
        {isTeachersPage ? 'Copy' : 'Copy chat'}
      </Button>
    </>
  );
}
