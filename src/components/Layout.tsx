import { Box } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ background: '#87002a', minHeight: '100vh' }}>{children}</Box>
  );
}
