import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import { useRouter } from 'next/router';

import DevLinkShortcuts from './DevLinkShortcuts';
import FounderStory from './FounderStory';
import Header from './Header';
import HowItWorks from './HowItWorks';
import Hero from './Hero';
import ProductBenefits from './ProductBenefits';
import { DEV_TEST_USER_QUERY_PARAM } from '@utils/activities';

const DEV_TEST_USER_SESSION_FLAG = 'wasDevTestUserSet';

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const activityButtonsRef = useRef<HTMLDivElement>(null);

  function visitStudentsPage(isDevTestUser: boolean = false) {
    const studentUrl = isDevTestUser
      ? `/student?${DEV_TEST_USER_QUERY_PARAM}=true`
      : '/student';

    // Deletes any prior dev test user session flags. A new one gets saved into
    // session storage when visiting the students page.
    if (isDevTestUser) sessionStorage.removeItem(DEV_TEST_USER_SESSION_FLAG);

    router.push(studentUrl);
  }

  function visitTeachersPage(isDevTestUser: boolean = false) {
    const teacherUrl = isDevTestUser
      ? `/teacher?${DEV_TEST_USER_QUERY_PARAM}=true`
      : '/teacher';

    // Deletes any prior dev test user session flags. A new one gets saved into
    // session storage when visiting the students page.
    if (isDevTestUser) sessionStorage.removeItem(DEV_TEST_USER_SESSION_FLAG);

    router.push(teacherUrl);
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
