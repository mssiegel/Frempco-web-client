import { Box, Typography } from '@mui/material';
import Link from '@components/shared/Link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ background: '#87002a', minHeight: '100vh', pl: 2 }}>
      <Navbar />
      {children}
    </Box>
  );
}

function Navbar() {
  return (
    process.env.NEXT_PUBLIC_NODE_ENV === 'development' && (
      <>
        <Typography variant='h5' sx={{ color: 'gray' }}>
          This link shortcut only appears in the development environment:
          {/* For an explanation: see https://github.com/mssiegel/frempco-client/issues/53 */}
        </Typography>
        <Typography variant='h4' sx={{ ml: 10, pt: 1, pb: 2 }}>
          <Link href='/' underline='hover' color='white'>
            Home
          </Link>
        </Typography>
      </>
    )
  );
}
