import { Box, Button, Icon, Typography } from '@mui/material';
import Image from 'next/image';

import Link from '@components/shared/Link';
import { useStudentLobbyAutoRejoin } from './hooks/useStudentLobbyAutoRejoin';

interface WelcomeMessageProps {
  activityPin: string;
  sessionId: string;
  removedFromClass: boolean;
  studentName: string;
  isMobile: boolean;
  addStudentToActivity: (studentName: string, pin: string) => void;
}

export default function WelcomeMessage({
  activityPin,
  sessionId,
  removedFromClass,
  studentName,
  isMobile,
  addStudentToActivity,
}: WelcomeMessageProps) {
  const status = useStudentLobbyAutoRejoin(activityPin, sessionId, {
    disabled: removedFromClass,
    rejoinStudent: () => addStudentToActivity(studentName, activityPin),
  });
  const shouldShowReconnectingState = status === 'rejoining';
  const shouldShowDisconnectedState = status === 'rejoinFailed';

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
      {removedFromClass ? (
        <>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{ mb: 4, fontWeight: 'normal' }}
            color='error.light'
          >
            Your teacher removed you.
          </Typography>
          <Typography variant={isMobile ? 'h5' : 'h4'}>
            Return to the <Link href='/'>Frempco homepage</Link> and login
            again.
          </Typography>
        </>
      ) : shouldShowReconnectingState ? (
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{ mb: 4, fontWeight: 'normal' }}
        >
          Reconnecting to the activity...
        </Typography>
      ) : shouldShowDisconnectedState ? (
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
            onClick={() => addStudentToActivity(studentName, activityPin)}
          >
            Rejoin activity
          </Button>
        </>
      ) : (
        <>
          <Typography variant='body1' sx={{ mx: 1 }}>
            Welcome to the activity! Your teacher will pair you soon...
          </Typography>
          {isMobile && (
            <Typography variant='body2' sx={{ mt: 2, mx: 1 }}>
              Note: You will be logged out of your chat if your smartphone
              screen goes dark.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}
