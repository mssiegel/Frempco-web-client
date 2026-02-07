import { Box, Typography } from '@mui/material';
import Link from '@components/shared/Link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <DevHomeLinkShortcut />
      {children}
    </Box>
  );
}

function DevHomeLinkShortcut() {
  return (
    process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
      <>
        <Typography variant='h5' sx={{ color: 'gray' }}>
          This link shortcut only appears in the development environment:
        </Typography>
        <Typography variant='h4' sx={{ ml: 10, pt: 1, pb: 2 }}>
          <Link href='/'>Home</Link>
        </Typography>
      </>
    )
  );
}
