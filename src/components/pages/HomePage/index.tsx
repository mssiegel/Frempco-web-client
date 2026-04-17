import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import { useRouter } from 'next/router';

import FounderStory from './FounderStory';
import Header from './Header';
import HowItWorks from './HowItWorks';
import Hero from './Hero';
import ProductBenefits from './ProductBenefits';

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const activityButtonsRef = useRef<HTMLDivElement>(null);

  function visitStudentsPage() {
    router.push('/student');
  }

  function visitTeachersPage() {
    router.push('/teacher');
  }

  return (
    <main>
      <Header
        visitStudentsPage={visitStudentsPage}
        visitTeachersPage={visitTeachersPage}
        activityButtonsRef={activityButtonsRef}
        isMobile={isMobile}
      />
      {/* Section One */}
      <Hero
        isMobile={isMobile}
        activityButtonsRef={activityButtonsRef}
        visitStudentsPage={visitStudentsPage}
        visitTeachersPage={visitTeachersPage}
      />

      <Box
        sx={{
          background: `linear-gradient(to bottom, ${theme.palette.neutrals.white}, ${theme.palette.primary[200]})`,
          px: isMobile ? 2 : 0,
        }}
      >
        {/* Section Two */}
        <ProductBenefits isMobile={isMobile} />

        {/* Section Three */}
        <HowItWorks isMobile={isMobile} />

        {/* Section Four */}
        <FounderStory isMobile={isMobile} />

        {/* Bottom padding  */}
        <Box sx={{ py: isMobile ? 2 : 4 }}></Box>
      </Box>
    </main>
  );
}
