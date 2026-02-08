import { Box } from '@mui/material';
import Image from 'next/image';

import StudentsButton from './StudentsButton';
import TeachersButton from './TeachersButton';

export default function Header({
  visitStudentsPage,
  visitTeachersPage,
}: {
  visitStudentsPage: (classroom: string, student: string) => Promise<void>;
  visitTeachersPage: (classroom: string) => void;
}) {
  return (
    <Box
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
        <Image
          src={'/frempcoLogoText.svg'}
          alt='Frempco logo text'
          width={105}
          height={18}
        />
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 1,
        }}
      >
        <StudentsButton visitStudentsPage={visitStudentsPage} />
        <TeachersButton visitTeachersPage={visitTeachersPage} />
      </Box>
    </Box>
  );
}
