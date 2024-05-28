/** @jsxImportSource @emotion/react */

import {
  RecordVoiceOver as RecordVoiceOverIcon,
  LocalLibrary as LocalLibraryIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { Typography } from '@mui/material';

export default function StudentBenefitsList({}) {
  return (
    <>
      <Typography textAlign='center' sx={{ fontSize: '26px' }}>
        Improves communication <RecordVoiceOverIcon />
      </Typography>
      <Typography
        textAlign='center'
        sx={{
          fontSize: '20px',
          maxWidth: '350px',
          margin: 'auto',
          marginBottom: '25px',
        }}
      >
        Through roleplaying, students will articulate their thoughts and
        opinions.
      </Typography>

      <Typography textAlign='center' sx={{ fontSize: '26px' }}>
        Demonstrates knowledge <LocalLibraryIcon />
      </Typography>
      <Typography
        textAlign='center'
        sx={{
          fontSize: '20px',
          maxWidth: '350px',
          margin: 'auto',
          marginBottom: '25px',
        }}
      >
        In their conversations, students will show how well they understand the
        topic.
      </Typography>

      <Typography textAlign='center' sx={{ fontSize: '26px' }}>
        Increases curiousity <LightModeIcon />
      </Typography>
      <Typography
        textAlign='center'
        sx={{ fontSize: '20px', maxWidth: '350px', margin: 'auto' }}
      >
        Students will emphasize with their characters and will strive to learn
        more about them.
      </Typography>
    </>
  );
}
