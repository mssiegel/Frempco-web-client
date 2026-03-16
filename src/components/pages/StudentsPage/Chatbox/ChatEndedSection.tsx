/** @jsxImportSource @emotion/react */

import { Typography } from '@mui/material';

import Link from '@components/shared/Link';

interface ChatEndedSectionProps {
  isConnected: boolean;
  chatEndedMsg: null | string;
}

export default function ChatEndedSection({
  isConnected,
  chatEndedMsg,
}: ChatEndedSectionProps): JSX.Element | null {
  let chatEndedInformationalMessage = null;

  if (!isConnected) {
    chatEndedInformationalMessage = (
      <>
        You were logged out. Return to the{' '}
        <Link href='/'>Frempco homepage</Link> and login again.
      </>
    );
  } else if (chatEndedMsg) {
    chatEndedInformationalMessage = chatEndedMsg;
  }

  return (
    <Typography
      sx={{
        borderTop: '1px dashed grey',
        pt: '10px',
        px: '10px',
        fontSize: '32px',
        color: '#87002a',
        fontStyle: 'italic',
        opacity: 0.7,
        '@media (max-width: 500px)': {
          fontSize: '24px',
        },
      }}
    >
      {chatEndedInformationalMessage}
    </Typography>
  );
}
