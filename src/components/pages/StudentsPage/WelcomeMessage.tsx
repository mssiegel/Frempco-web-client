import { Box, Button, Icon, Typography } from '@mui/material';
import Image from 'next/image';

import Link from '@components/shared/Link';
import { useStudentLobbyAutoRejoin } from './hooks/useStudentLobbyAutoRejoin';

export default function WelcomeMessage({
  activityPin,
  sessionId,
  removedFromClass,
  studentName,
  isMobile,
  addStudentToActivity,
}: WelcomeMessageProps) {
  const onRejoinActivity = () => addStudentToActivity(studentName, activityPin);
  const status = useStudentLobbyAutoRejoin(activityPin, sessionId, {
    disabled: removedFromClass,
    rejoinStudent: onRejoinActivity,
  });
  const displayState: WelcomeMessageDisplayState = removedFromClass
    ? 'removed'
    : status === 'rejoining'
      ? 'rejoining'
      : status === 'rejoinFailed'
        ? 'rejoinFailed'
        : 'waiting';

  function renderMessage() {
    switch (displayState) {
      case 'removed':
        return <RemovedFromClassMessage isMobile={isMobile} />;
      case 'rejoining':
        return <ReconnectingMessage isMobile={isMobile} />;
      case 'rejoinFailed':
        return (
          <ReconnectFailedMessage
            isMobile={isMobile}
            onRejoinActivity={onRejoinActivity}
          />
        );
      case 'waiting':
        return <WaitingInLobbyMessage />;
    }
  }

  return (
    <Box textAlign='center'>
      <Image
        src='/StudentsPage/waiting-in-lobby.png'
        alt='Waiting in lobby'
        height={48}
        width={48}
        style={{ display: 'block', margin: 'auto' }}
      />
      <Typography
        variant={isMobile ? 'h3' : 'h1'}
        sx={{ py: 4 }}
      >{`Hello ${studentName}`}</Typography>
      {renderMessage()}
    </Box>
  );
}

interface WelcomeMessageProps {
  activityPin: string;
  sessionId: string;
  removedFromClass: boolean;
  studentName: string;
  isMobile: boolean;
  addStudentToActivity: (studentName: string, pin: string) => void;
}

type WelcomeMessageDisplayState =
  | 'removed'
  | 'rejoining'
  | 'rejoinFailed'
  | 'waiting';

interface MessageVariantProps {
  isMobile: boolean;
}

function RemovedFromClassMessage({ isMobile }: MessageVariantProps) {
  return (
    <>
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        sx={{ mb: 4, fontWeight: 'normal' }}
        color='error.light'
      >
        Your teacher removed you.
      </Typography>
      <Typography variant={isMobile ? 'h5' : 'h4'}>
        Return to the <Link href='/'>Frempco homepage</Link> and login again.
      </Typography>
    </>
  );
}

function ReconnectingMessage({ isMobile }: MessageVariantProps) {
  return (
    <Typography
      variant={isMobile ? 'h5' : 'h4'}
      sx={{ mb: 4, fontWeight: 'normal' }}
    >
      Reconnecting to the activity...
    </Typography>
  );
}

function ReconnectFailedMessage({
  isMobile,
  onRejoinActivity,
}: MessageVariantProps & { onRejoinActivity: () => void }) {
  return (
    <>
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        sx={{ mb: 4, fontWeight: 'normal' }}
        color='error.light'
      >
        We couldn&apos;t reconnect automatically.
      </Typography>
      <Button
        variant='contained'
        color='primary'
        startIcon={<Icon sx={{ fontSize: 24 }}>play_arrow</Icon>}
        onClick={onRejoinActivity}
      >
        Rejoin activity
      </Button>
    </>
  );
}

function WaitingInLobbyMessage() {
  return (
    <Typography variant='body1' sx={{ mx: 1 }}>
      Welcome to the activity! Your teacher will pair you soon...
    </Typography>
  );
}
