/** @jsxImportSource @emotion/react */

import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import { useRef } from 'react';
import { useHeaderButtonsVisibility } from '@hooks/HomePage/useHeaderButtonsVisibility';

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
  const headerRef = useRef<HTMLDivElement>(null);
  const shouldShowHeaderButtons = useHeaderButtonsVisibility({
    gameButtonsRef,
    headerRef,
  });

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
        <LogoText
          showLogoText={showLogoText}
          transition={HEADER_ANIMATION_TRANSITION}
        />
      </Box>
      <Box
        display='flex'
        gap={isMobile ? 0 : 1}
        height='52px' // Prevent layout shift when buttons appear/disappear
        alignItems='center'
        sx={getHeaderButtonsSx(shouldShowHeaderButtons)}
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
        maxWidth: showLogoText ? '100px' : '0px',
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

const HEADER_ANIMATION_TRANSITION = '220ms cubic-bezier(0.4, 0, 0.2, 1)';

function getHeaderButtonsSx(shouldShowHeaderButtons: boolean) {
  return {
    opacity: shouldShowHeaderButtons ? 1 : 0,
    transform: shouldShowHeaderButtons ? 'translateY(0)' : 'translateY(-6px)',
    visibility: shouldShowHeaderButtons ? 'visible' : 'hidden',
    pointerEvents: shouldShowHeaderButtons ? 'auto' : 'none',
    transition: `opacity ${HEADER_ANIMATION_TRANSITION}, transform ${HEADER_ANIMATION_TRANSITION}, visibility ${HEADER_ANIMATION_TRANSITION}`,
    willChange: 'opacity, transform',
  };
}
