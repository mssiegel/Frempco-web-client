/** @jsxImportSource @emotion/react */

import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext, useRef } from 'react';
import { useRouter } from 'next/router';

import { SocketContext } from '@contexts/SocketContext';
import { UserContext } from '@contexts/UserContext';
import CoreValues from './CoreValues';
import DevLinkShortcuts from './DevLinkShortcuts';
import ForWhom from './ForWhom';
import FounderStory from './FounderStory';
import Header from './Header';
import HowItWorks from './HowItWorks';
import Hero from './Hero';
import ProductBenefits from './ProductBenefits';

export default function HomePage() {
  const router = useRouter();
  const socket = useContext(SocketContext);
  const { setUser } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const gameButtonsRef = useRef<HTMLDivElement>(null);

  function visitStudentsPage(isDevTestUser: boolean = false) {
    const studentUrl = isDevTestUser
      ? '/student?isDevTestUser=true'
      : '/student';
    router.push(studentUrl);
  }

  function visitTeachersPage(classroom: string) {
    socket.emit('activate classroom', { classroomName: classroom });
    setUser({ isLoggedIn: true });
    router.push(`/teacher/classroom/${classroom}`);
  }

  return (
    <main>
      {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
        <DevLinkShortcuts
          visitTeachersPage={visitTeachersPage}
          visitStudentsPage={visitStudentsPage}
        />
      )}

      <Header
        visitStudentsPage={visitStudentsPage}
        visitTeachersPage={visitTeachersPage}
        gameButtonsRef={gameButtonsRef}
        isMobile={isMobile}
      />

      <Box sx={{ mx: isMobile ? 2 : 0 }}>
        {/* Section One */}
        <Hero
          isMobile={isMobile}
          gameButtonsRef={gameButtonsRef}
          visitStudentsPage={visitStudentsPage}
          visitTeachersPage={visitTeachersPage}
        />

        {/* Section Two */}
        <ProductBenefits isMobile={isMobile} />

        {/* Section Three */}
        <HowItWorks />

        {/* Section Four */}
        <CoreValues />

        {/* Section Five */}
        <ForWhom />

        {/* Section Six */}
        <FounderStory />
      </Box>
    </main>
  );
}
