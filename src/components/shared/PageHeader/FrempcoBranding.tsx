import { Box } from '@mui/material';
import Link from '@components/shared/Link';

export default function FrempcoBranding(): JSX.Element {
  return (
    <Link href='/' noLinkStyle>
      <Box display='flex' gap={2} alignItems='flex-end'>
        <img
          src='/StudentsPage/frempco-logo-icon.svg'
          alt='Frempco logo icon'
          style={{ height: 28, width: 'auto' }}
        />
        <img
          src='/StudentsPage/frempco-logo-text.svg'
          alt='Frempco logo text'
          style={{ height: 24, width: 'auto' }}
        />
      </Box>
    </Link>
  );
}
