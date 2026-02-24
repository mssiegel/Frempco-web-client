/** @jsxImportSource @emotion/react */

import { Box } from '@mui/material';

import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import { useRef } from 'react';
import { useHeaderButtonsVisibility } from '@hooks/HomePage/useHeaderButtonsVisibility';

interface HeaderProps {
  visitStudentsPage: (classroom: string, student: string) => void;
  visitTeachersPage: (classroom: string) => void;
  gameButtonsRef: React.RefObject<HTMLElement>;
  isMobile: boolean;
}

export default function Header({
  visitStudentsPage,
  visitTeachersPage,
  gameButtonsRef,
  isMobile,
}: HeaderProps): JSX.Element {
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
      sx={{ padding: isMobile ? '10px 16px' : '12px 80px' }}
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
        sx={getHeaderButtonsSx(shouldShowHeaderButtons, isMobile)}
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
        width: showLogoText ? 'auto' : '0px',
        overflow: 'hidden',
        opacity: showLogoText ? 1 : 0,
        transform: showLogoText ? 'scale(1)' : 'scale(0.5)',
        transition: `width ${transition}, opacity ${transition}, transform ${transition}, margin ${transition}`,
        willChange: 'width, opacity, transform, margin',
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

function getHeaderButtonsSx(
  shouldShowHeaderButtons: boolean,
  isMobile: boolean,
) {
  return {
    // retains the space for desktop layout; removes the space on mobile when buttons are hidden
    opacity: shouldShowHeaderButtons ? 1 : 0,
    width: isMobile && !shouldShowHeaderButtons ? '0px' : 'auto',
    overflow: 'hidden',
    visibility: isMobile || shouldShowHeaderButtons ? 'visible' : 'hidden',

    transform: shouldShowHeaderButtons ? 'translateY(0)' : 'translateY(-6px)',
    pointerEvents: shouldShowHeaderButtons ? 'auto' : 'none',
    transition: `width ${HEADER_ANIMATION_TRANSITION}, height ${HEADER_ANIMATION_TRANSITION}, opacity ${HEADER_ANIMATION_TRANSITION}, transform ${HEADER_ANIMATION_TRANSITION}`,
    willChange: 'width, height, opacity, transform',
  };
}
