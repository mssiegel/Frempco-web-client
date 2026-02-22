/** @jsxImportSource @emotion/react */

import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  const transition = '220ms cubic-bezier(0.4, 0, 0.2, 1)';

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

  // There is room for the logo text on desktop. And also on mobile when the
  // buttons are hidden.
  const showLogoText = !isMobile || !shouldShowHeaderButtons;

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
        <LogoText showLogoText={showLogoText} transition={transition} />
      </Box>
      <Box
        display='flex'
        gap={isMobile ? 0 : 1}
        height='52px' // Prevent layout shift when buttons appear/disappear
        alignItems='center'
        sx={{
          opacity: shouldShowHeaderButtons ? 1 : 0,
          transform: shouldShowHeaderButtons
            ? 'translateY(0)'
            : 'translateY(-6px)',
          visibility: shouldShowHeaderButtons ? 'visible' : 'hidden',
          pointerEvents: shouldShowHeaderButtons ? 'auto' : 'none',
          transition: `opacity ${transition}, transform ${transition}, visibility ${transition}`,
          willChange: 'opacity, transform',
        }}
      >
        <StudentsButton visitStudentsPage={visitStudentsPage} />
        {!isMobile && <TeachersButton visitTeachersPage={visitTeachersPage} />}
      </Box>
    </Box>
  );
}

interface LogoTextProps {
  showLogoText: boolean;
  transition: string;
}

function LogoText({ showLogoText, transition }: LogoTextProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        maxWidth: showLogoText ? '220px' : '0px',
        opacity: showLogoText ? 1 : 0,
        transform: showLogoText ? 'scale(1)' : 'scale(0.5)',
        transition: `max-width ${transition}, opacity ${transition}, transform ${transition}, margin ${transition}`,
        willChange: 'max-width, opacity, transform, margin',
      }}
    >
      <img
        src='/frempco-logo-text.svg'
        alt='Frempco logo text'
        style={{ height: 36, width: 'auto' }}
      />
    </Box>
  );
}
