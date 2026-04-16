import { Box, Button, Icon, Typography } from '@mui/material';

interface ChatEndedSectionProps {
  chatEndedMsg: null | string;
  isMobile: boolean;
  studentName: string;
  activityPin: string;
  addStudentToActivity: (studentName: string, pin: string) => void;
}

export default function ChatEndedSection({
  chatEndedMsg,
  isMobile,
  studentName,
  activityPin,
  addStudentToActivity,
}: ChatEndedSectionProps): JSX.Element | null {
  let chatEndedInformationalMessage = null;

  chatEndedInformationalMessage = chatEndedMsg
    ? chatEndedMsg
    : 'You were logged out';

  return (
    <Box
      sx={(theme) => ({
        borderTop: `1px dashed ${theme.palette.neutrals[200]}`,
        py: '10px',
      })}
    >
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        sx={{
          color: 'error.dark',
          textAlign: 'center',
          mb: 1,
          fontWeight: 'normal',
        }}
      >
        {chatEndedInformationalMessage}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant='contained'
          color='primary'
          startIcon={<Icon sx={{ fontSize: 24 }}>play_arrow</Icon>}
          onClick={() => addStudentToActivity(studentName, activityPin)}
        >
          Get matched again
        </Button>
      </Box>
    </Box>
  );
}
