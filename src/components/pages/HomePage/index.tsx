import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import { useRouter } from 'next/router';

import CoreValues from './CoreValues';
import DevLinkShortcuts from './DevLinkShortcuts';
import ForWhom from './ForWhom';
import FounderStory from './FounderStory';
import Header from './Header';
import HowItWorks from './HowItWorks';
import Hero from './Hero';
import ProductBenefits from './ProductBenefits';
import { DEV_TEST_USER_QUERY_PARAM } from '@utils/classrooms';

const DEV_TEST_USER_SESSION_FLAG = 'wasDevTestUserSet';

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const gameButtonsRef = useRef<HTMLDivElement>(null);

  function visitStudentsPage(isDevTestUser: boolean = false) {
    const studentUrl = isDevTestUser
      ? `/student?${DEV_TEST_USER_QUERY_PARAM}=true`
      : '/student';

    // Deletes any prior dev test user session flags. A new one gets saved into
    // session storage when visiting the students page.
    if (isDevTestUser) sessionStorage.removeItem(DEV_TEST_USER_SESSION_FLAG);

    router.push(studentUrl);
  }

  function visitTeachersPage() {
    router.push('/teacher/classroom');
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
