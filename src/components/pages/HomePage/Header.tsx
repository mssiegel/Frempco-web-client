import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';

import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';
import { useEffect, useRef, useState } from 'react';

export default function Header({
  visitStudentsPage,
  visitTeachersPage,
  scrollTrackRef,
}: {
  visitStudentsPage: (classroom: string, student: string) => Promise<void>;
  visitTeachersPage: (classroom: string) => void;
  scrollTrackRef: React.RefObject<HTMLElement>;
}) {
  const theme = useTheme();
  const isXs = !useMediaQuery(theme.breakpoints.up('md')); // Indicates if the screen is extra small (mobile)

  const [isScrollTrackVisible, setIsScrollTrackVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);

  // Checks if the scroll-tracked element is visible relative to the header
  useEffect(() => {
    function handleScroll() {
      if (!headerRef.current || !scrollTrackRef.current) return;
      const headerRect = headerRef.current.getBoundingClientRect();
      const trackedRect = scrollTrackRef.current.getBoundingClientRect();

      // If tracked element's top is below header's bottom, it's visible
      const isVisible = trackedRect.top > headerRect.bottom;
      setIsScrollTrackVisible(isVisible);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerRef, scrollTrackRef, setIsScrollTrackVisible]);

  const showStudentsBtn = !isXs || (isXs && !isScrollTrackVisible);

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
          src='/frempcoLogoIcon.svg'
          alt='Frempco logo icon'
          width={26}
          height={25}
        />
        {!isXs && (
          <Image
            src={'/frempcoLogoText.svg'}
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
        {showStudentsBtn && (
          <StudentsButton visitStudentsPage={visitStudentsPage} />
        )}
        {!isXs && <TeachersButton visitTeachersPage={visitTeachersPage} />}
      </Box>
    </Box>
  );
}
