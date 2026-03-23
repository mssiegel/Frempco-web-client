import { Box, Typography } from '@mui/material';

interface HeaderRow {
  label: string;
  value: string;
}
interface ChatboxHeaderProps {
  headerRows: HeaderRow[];
}

export default function ChatboxHeader({
  headerRows,
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
      {headerRows.map(({ label, value }) => (
        <RowForHeader key={label} label={label} value={value} />
      ))}
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
