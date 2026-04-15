import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface PageHeaderProps {
  leftElement: JSX.Element;
  statusText: string;
  isSticky: boolean;
}

export default function PageHeader({
  leftElement,
  statusText,
  isSticky,
}: PageHeaderProps): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: 'primary.500',
        color: 'neutrals.white',
        py: '10px',
        px: isMobile ? '40px' : '80px',
        borderBottom: '2px solid',
        borderBottomColor: 'neutrals.200',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...(isSticky && { position: 'sticky', top: 0, zIndex: 1 }),
      }}
    >
      {leftElement}
      {!isMobile && statusText && (
        <Typography variant='h4'>{statusText}</Typography>
      )}
    </Box>
  );
}
