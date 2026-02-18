/** @jsxImportSource @emotion/react */

import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import { useEffect, useRef, useState } from 'react';

interface HeaderProps {
  visitStudentsPage: (classroom: string, student: string) => void;
  visitTeachersPage: (classroom: string) => void;
  gameButtonsRef: React.RefObject<HTMLElement>;
}

export default function Header({
  visitStudentsPage,
  visitTeachersPage,
  gameButtonsRef,
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [shouldShowHeaderButtons, setShouldShowHeaderButtons] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (!headerRef.current || !gameButtonsRef.current) return;
      const headerPosition = headerRef.current.getBoundingClientRect();
      const gameButtonsPosition =
        gameButtonsRef.current.getBoundingClientRect();
      // Show buttons in header when user has scrolled past the buttons in the
      // main content. So they can easily navigate to other pages without
      // having to scroll back up.
      setShouldShowHeaderButtons(
        headerPosition.bottom > gameButtonsPosition.bottom,
      );
    }
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [gameButtonsRef, headerRef]);

  return (
    <Box
      ref={headerRef}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      borderBottom='2px solid'
      borderColor='neutrals.200'
      position='sticky'
      top={0}
      zIndex={1000}
      bgcolor='neutrals.white'
      sx={{ padding: { xs: '24px 40px', md: '24px 80px' } }}
    >
      <Box display='flex' gap={1} alignItems='flex-end'>
        <Image
          src='/frempco-logo-icon.svg'
          alt='Frempco logo icon'
          width={26}
          height={25}
        />
        {!isMobile && (
          <Image
            src={'/frempco-logo-text.svg'}
            alt='Frempco logo text'
            width={105}
            height={18}
          />
        )}
      </Box>
      <Box
        display='flex'
        gap={1}
        height='52px' // Prevent layout shift when buttons appear/disappear
      >
        {shouldShowHeaderButtons && (
          <>
            <StudentsButton visitStudentsPage={visitStudentsPage} />
            {!isMobile && (
              <TeachersButton visitTeachersPage={visitTeachersPage} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
