/** @jsxImportSource @emotion/react */

import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { throttle } from 'lodash-es';

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
    // Throttling avoids running this layout calculation on every scroll
    // event, thereby reducing the browser's CPU usage.
    const handleScroll = throttle(
      () => {
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
      },
      60,
      {
        leading: true,
        trailing: true,
      },
    );

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [gameButtonsRef, headerRef]);

  const hasSpaceForLogoText = !isMobile || !shouldShowHeaderButtons;

  return (
    <Box
      ref={headerRef}
      display='flex'
      justifyContent={isMobile ? 'space-between' : 'space-evenly'}
      alignItems='center'
      borderBottom='2px solid'
      borderColor='neutrals.200'
      position='sticky'
      top={0}
      zIndex={1000}
      bgcolor='neutrals.white'
      sx={{ padding: { xs: '12px 16px', md: '12px 80px' } }}
    >
      <Box display='flex' gap={2} alignItems='flex-end'>
        <img
          src='/frempco-logo-icon.svg'
          alt='Frempco logo icon'
          style={{ height: isMobile ? 50 : 36, width: 'auto' }}
        />
        {hasSpaceForLogoText && (
          <img
            src='/frempco-logo-text.svg'
            alt='Frempco logo text'
            style={{ height: 36, width: 'auto' }}
          />
        )}
      </Box>
      <Box
        display='flex'
        gap={isMobile ? 0 : 1}
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
