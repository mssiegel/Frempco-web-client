import { Box, Typography } from '@mui/material';
import Link from '@utilComponents/Link';

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
    <Typography variant='h4' sx={{ ml: 10, pt: 1, pb: 2 }}>
      <Link href='/' underline='hover' color='white'>
        Home
      </Link>
    </Typography>
  );
}
