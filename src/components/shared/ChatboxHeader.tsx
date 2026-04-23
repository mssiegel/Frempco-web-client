import { Box, Button, Typography } from '@mui/material';

interface HeaderRow {
  label: string;
  value: string;
}

interface ChatboxHeaderProps {
  headerRows: HeaderRow[];
  shouldShowEndChatButton: boolean;
  onEndChat?: () => void;
}

export default function ChatboxHeader({
  headerRows,
  shouldShowEndChatButton,
  onEndChat,
}: ChatboxHeaderProps): JSX.Element {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.500',
        borderRadius: '12px 12px 0 0',
        py: '10px',
        px: '16px',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
        <Box>
          {headerRows.map(({ label, value }) => (
            <RowForHeader key={label} label={label} value={value} />
          ))}
        </Box>
        {shouldShowEndChatButton && (
          <Button
            variant='contained'
            disableElevation
            onClick={onEndChat}
            sx={{
              alignSelf: 'center',
              minWidth: 'auto',
              px: 1.75,
              py: 0.75,
              backgroundColor: 'rgba(255, 255, 255, 0.24)',
              color: 'neutrals.white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.30)',
              },
            }}
          >
            End
          </Button>
        )}
      </Box>
    </Box>
  );
}

function RowForHeader({ label, value }: HeaderRow): JSX.Element {
  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      <Typography variant='body2' sx={{ color: 'neutrals.200' }}>
        {label}
      </Typography>
      <Typography variant='body2' sx={{ color: 'neutrals.white' }}>
        {value}
      </Typography>
    </Box>
  );
}
