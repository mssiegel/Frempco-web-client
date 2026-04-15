import { Box, Grid } from '@mui/material';

import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import { useRef } from 'react';
import { useHeaderButtonsVisibility } from './hooks/useHeaderButtonsVisibility';

interface HeaderProps {
  visitStudentsPage: (isDevTestUser?: boolean) => void;
  visitTeachersPage: (isDevTestUser?: boolean) => void;
  activityButtonsRef: React.RefObject<HTMLElement>;
  isMobile: boolean;
}

export default function Header({
  visitStudentsPage,
  visitTeachersPage,
  activityButtonsRef,
  isMobile,
}: HeaderProps): JSX.Element {
  const headerRef = useRef<HTMLDivElement>(null);
  const shouldShowHeaderButtons = useHeaderButtonsVisibility({
    activityButtonsRef,
    headerRef,
  });

  // There is room for the logo text on desktop. And also on mobile when the
  // buttons are hidden.
  const showLogoText = !isMobile || !shouldShowHeaderButtons;

  return (
    <Box
      ref={headerRef}
      borderBottom='2px solid'
      borderColor='neutrals.200'
      position='sticky'
      top={0}
      zIndex={1000}
      bgcolor='neutrals.white'
      sx={{ px: isMobile ? 2 : 0, py: isMobile ? '10px' : '12px' }}
    >
      {isMobile ? (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <HeaderLogo
            iconHeight={50}
            showLogoText={showLogoText}
            transition={HEADER_ANIMATION_TRANSITION}
          />
          <Box
            display='flex'
            gap={0}
            height='52px' // Prevent layout shift when buttons appear/disappear
            alignItems='center'
            sx={getHeaderButtonsSx(shouldShowHeaderButtons, isMobile)}
          >
            <StudentsButton visitStudentsPage={visitStudentsPage} />
          </Box>
        </Box>
      ) : (
        <Grid container alignItems='center'>
          {/* Left margin - 1 column */}
          <Grid item md={1} />

          {/* Left content - 5 columns */}
          <Grid item md={5}>
            <HeaderLogo
              iconHeight={36}
              showLogoText={showLogoText}
              transition={HEADER_ANIMATION_TRANSITION}
            />
          </Grid>

          {/* Spacing - 1 column */}
          <Grid item md={1} />

          {/* Right content - 4 columns */}
          <Grid item md={4}>
            <Box
              display='flex'
              justifyContent='center'
              gap={1}
              height='52px' // Prevent layout shift when buttons appear/disappear
              alignItems='center'
              sx={getHeaderButtonsSx(shouldShowHeaderButtons, isMobile)}
            >
              <StudentsButton visitStudentsPage={visitStudentsPage} />
              <TeachersButton visitTeachersPage={visitTeachersPage} />
            </Box>
          </Grid>

          {/* Right margin - 1 column */}
          <Grid item md={1} />
        </Grid>
      )}
    </Box>
  );
}

interface HeaderLogoProps {
  iconHeight: number;
  showLogoText: boolean;
  transition: string;
}

function HeaderLogo({
  iconHeight,
  showLogoText,
  transition,
}: HeaderLogoProps) {
  return (
    <Box display='flex' gap={2} alignItems='flex-end'>
      <img
        src='/HomePage/frempco-logo-icon.svg'
        alt='Frempco logo icon'
        style={{ height: iconHeight, width: 'auto' }}
      />
      <LogoText showLogoText={showLogoText} transition={transition} />
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
        src='/HomePage/frempco-logo-text.svg'
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
