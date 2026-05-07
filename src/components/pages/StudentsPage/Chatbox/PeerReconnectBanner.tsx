import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface PeerReconnectBannerProps {
  graceExpiresAt: number;
}

function formatTimeRemaining(milliseconds: number): string {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function PeerReconnectBanner({
  graceExpiresAt,
}: PeerReconnectBannerProps): JSX.Element {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [graceExpiresAt]);

  const timeRemaining = Math.max(0, graceExpiresAt - now);

  return (
    <Box
      sx={{
        mx: 1,
        mt: 1,
        px: 2,
        py: 1,
        borderRadius: '8px',
        backgroundColor: 'primary.100',
        border: '1px solid',
        borderColor: 'primary.300',
      }}
    >
      <Typography variant='body2'>
        Your partner disconnected. They have{' '}
        <strong>{formatTimeRemaining(timeRemaining)}</strong> to return.
      </Typography>
    </Box>
  );
}
