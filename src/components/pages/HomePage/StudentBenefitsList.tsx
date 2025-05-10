/** @jsxImportSource @emotion/react */

import {
  RecordVoiceOver as RecordVoiceOverIcon,
  LocalLibrary as LocalLibraryIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { Typography } from '@mui/material';

import studentBenefitsListCSS from './StudentBenefitsList.css';

export default function StudentBenefitsList({}) {
  return (
    <div>
      <Typography css={studentBenefitsListCSS.header}>
        Improves communication <RecordVoiceOverIcon />
      </Typography>
      <Typography css={studentBenefitsListCSS.text}>
        Through roleplaying, students will articulate their thoughts and
        opinions.
      </Typography>

      <Typography css={studentBenefitsListCSS.header}>
        Demonstrates knowledge <LocalLibraryIcon />
      </Typography>
      <Typography css={studentBenefitsListCSS.text}>
        In their conversations, students will show how well they understand the
        topic.
      </Typography>

      <Typography css={studentBenefitsListCSS.header}>
        Increases curiousity <LightModeIcon />
      </Typography>
      <Typography css={studentBenefitsListCSS.text}>
        Students will emphasize with their characters and will strive to learn
        more about them.
      </Typography>
    </div>
  );
}
