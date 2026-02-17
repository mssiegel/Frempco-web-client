/** @jsxImportSource @emotion/react */
import { useMediaQuery } from '@mui/material';
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
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const socket = useContext(SocketContext);
  const { setUser } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const gameButtonsRef = useRef<HTMLDivElement>(null);

  async function visitStudentsPage(classroom: string, student: string) {
    const getResponse = await fetch(`${apiUrl}/classrooms/${classroom}`);
    const { isActive } = await getResponse.json();
    if (!isActive)
      return window.alert(
        `Classroom not found: ${classroom}\nCheck that you entered the correct Classroom PIN.`,
      );
    if (student) {
      socket.emit('new student entered', { classroom, student });
      setUser({ isLoggedIn: true, name: student });
      router.push(`/student/classroom/${classroom}`);
    }
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
      />

      {/* Section One */}
      <Hero
        isMobile={isMobile}
        gameButtonsRef={gameButtonsRef}
        visitStudentsPage={visitStudentsPage}
        visitTeachersPage={visitTeachersPage}
      />

      {/* Section Two */}
      <ProductBenefits />

      {/* Section Three */}
      <HowItWorks />

      {/* Section Four */}
      <CoreValues />

      {/* Section Five */}
      <ForWhom />

      {/* Section Six */}
      <FounderStory />
    </main>
  );
}
