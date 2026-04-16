import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  DEV_TEST_USER_QUERY_PARAM,
  TEST_ACTIVITY_PIN,
  DEV_TEST_USER_SESSION_FLAG,
} from '@utils/activities';
import { SocketContext } from '@contexts/SocketContext';
import PageHeader from '@components/shared/PageHeader';
import FrempcoBranding from '@components/shared/PageHeader/FrempcoBranding';
import { useStudentSocketHandlers } from './hooks/useStudentSocketHandlers';
import Chatbox from './Chatbox';
import WelcomeMessage from './WelcomeMessage';
import LoginFlow from './LoginFlow';
import { STAGE, Stage, StudentPairedChat, StudentSoloChat } from './types';

export default function StudentsPage(): JSX.Element {
  const socket = useContext(SocketContext);
  console.log('Student socketId:', socket?.id ?? 'No socket found');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [studentName, setStudentName] = useState('');
  const [pin, setPin] = useState('');
  const [stage, setStage] = useState<Stage>(STAGE.joining);
  const [chat, setChat] = useState<StudentPairedChat | StudentSoloChat>();
  // { Example chat object:
  //   mode: 'PAIRED',
  //   characters: {
  //     you: 'your character',
  //     peer: 'peer character',
  //   },
  //   conversation: [
  //     // ['you', 'i need blood'],
  //     // ['peer', 'i will cast a spell to make some'],
  //   ],
  // }
  const [chatEndedMsg, setChatEndedMsg] = useState<null | string>(null);
  const router = useRouter();
  const headerStatusTextMap: Record<Stage, string> = {
    [STAGE.joining]: 'Join an Activity',
    [STAGE.lobby]: 'Waiting in Lobby',
    [STAGE.chatting]: 'Chatting with someone',
    [STAGE.chatEnded]: 'Chat ended',
    [STAGE.removedByTeacher]: 'Removed by teacher',
  };
  const headerStatusText = headerStatusTextMap[stage];
  const isChatboxStage = stage === STAGE.chatting || stage === STAGE.chatEnded;

  const pageHeaderLeftElement =
    stage === STAGE.joining ? (
      <FrempcoBranding />
    ) : (
      <Typography variant='h4'>{studentName}</Typography>
    );

  // Keep chat anchored to the bottom on mobile so more of it remains visible
  // when the on-screen keyboard opens and reduces the available viewport height.
  const shouldAnchorContentToBottom = isMobile && isChatboxStage;

  function addStudentToActivity(studentName: string, pin: string) {
    socket.emit('new student entered', {
      student: studentName,
      activityPin: pin,
    });
    setStage(STAGE.lobby);
  }

  function initializeDevTestUser() {
    const randomStudentName = `Student ${Math.trunc(
      Math.random() * 10000,
    ).toString()}`;

    setStudentName(randomStudentName);
    setPin(TEST_ACTIVITY_PIN);
    addStudentToActivity(randomStudentName, TEST_ACTIVITY_PIN);
    sessionStorage.setItem(DEV_TEST_USER_SESSION_FLAG, 'true');
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isDevTestUserRequested =
      new URLSearchParams(window.location.search).get(
        DEV_TEST_USER_QUERY_PARAM,
      ) === 'true';
    // Persist this flag in sessionStorage (instead of React state) so
    // Next.js Fast Refresh after local saves does not create a new dev test
    // user. sessionStorage survives within the current tab session, so we
    // initialize only one dev test user per session.
    const hasInitializedDevTestUser =
      sessionStorage.getItem(DEV_TEST_USER_SESSION_FLAG) === 'true';

    if (isDevTestUserRequested && !hasInitializedDevTestUser) {
      initializeDevTestUser();
    }
  }, []);

  useStudentSocketHandlers({
    socket,
    router,
    setChat,
    setStage,
    setChatEndedMsg,
  });

  const pageContent =
    stage === STAGE.joining ? (
      <LoginFlow
        pin={pin}
        setPin={setPin}
        setStudentName={setStudentName}
        isMobile={isMobile}
        addStudentToActivity={addStudentToActivity}
      />
    ) : isChatboxStage ? (
      <Chatbox
        socket={socket}
        chat={chat}
        setChat={setChat}
        chatEndedMsg={chatEndedMsg}
        studentName={studentName}
        activityPin={pin}
        addStudentToActivity={addStudentToActivity}
        socketId={socket.id}
        isMobile={isMobile}
      />
    ) : (
      <WelcomeMessage
        activityPin={pin}
        socketId={socket.id}
        removedFromClass={stage === STAGE.removedByTeacher}
        studentName={studentName}
        isMobile={isMobile}
      />
    );

  return (
    <Box
      component='main'
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(to bottom, ${theme.palette.neutrals.white}, ${theme.palette.primary[200]})`,
      }}
    >
      <PageHeader
        statusText={headerStatusText}
        leftElement={pageHeaderLeftElement}
        // Header is not sticky as we don't want the header to cover the chatbox when the keyboard is open.
        isSticky={false}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: shouldAnchorContentToBottom ? 'flex-end' : 'center',
        }}
      >
        {pageContent}
      </Box>
    </Box>
  );
}
