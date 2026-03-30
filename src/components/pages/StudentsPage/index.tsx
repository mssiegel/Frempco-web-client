import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  DEV_TEST_USER_QUERY_PARAM,
  TEST_CLASSROOM_NAME,
  DEV_TEST_USER_SESSION_FLAG,
} from '@utils/classrooms';
import { SocketContext } from '@contexts/SocketContext';
import { useStudentSocketHandlers } from './hooks/useStudentSocketHandlers';
import Chatbox from './Chatbox';
import WelcomeMessage from './WelcomeMessage';
import Header from './Header';
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
    [STAGE.joining]: 'Join a Game',
    [STAGE.lobby]: 'Waiting in Lobby',
    [STAGE.chatting]: 'Chatting with someone',
    [STAGE.chatEnded]: 'Chat ended',
    [STAGE.removedByTeacher]: 'Removed by teacher',
  };
  const headerStatusText = headerStatusTextMap[stage];
  const isChatboxStage = stage === STAGE.chatting || stage === STAGE.chatEnded;

  // Keep chat anchored to the bottom on mobile so more of it remains visible
  // when the on-screen keyboard opens and reduces the available viewport height.
  const shouldAnchorContentToBottom = isMobile && isChatboxStage;

  function addStudentToGameroom(
    studentName: string,
    pin: string,
    updateStageToLobby = true,
  ) {
    socket.emit('new student entered', {
      student: studentName,
      classroom: pin,
    });
    if (updateStageToLobby) {
      setStage(STAGE.lobby);
    }
  }

  function initializeDevTestUser() {
    const randomStudentName = `Student ${Math.trunc(
      Math.random() * 10000,
    ).toString()}`;

    setStudentName(randomStudentName);
    setPin(TEST_CLASSROOM_NAME);
    addStudentToGameroom(randomStudentName, TEST_CLASSROOM_NAME);
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
        addStudentToGameroom={addStudentToGameroom}
      />
    ) : isChatboxStage ? (
      <Chatbox
        socket={socket}
        chat={chat}
        setChat={setChat}
        chatEndedMsg={chatEndedMsg}
        classroomName={pin}
        socketId={socket.id}
        isMobile={isMobile}
      />
    ) : (
      <WelcomeMessage
        pin={pin}
        removedFromClass={stage === STAGE.removedByTeacher}
        isLobbyStage={stage === STAGE.lobby}
        socket={socket}
        socketId={socket.id}
        studentName={studentName}
        isMobile={isMobile}
        addStudentToGameroom={addStudentToGameroom}
      />
    );

  return (
    <Box
      component='main'
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background:
          'var(--Gradients, linear-gradient(180deg, #FFF 0%, #EBECFE 100%))',
      }}
    >
      <Header
        isMobile={isMobile}
        statusText={headerStatusText}
        studentName={studentName || undefined}
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
