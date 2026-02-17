/** @jsxImportSource @emotion/react */

import { Typography } from '@mui/material';

import Link from '@components/shared/Link';

export default function FounderStory(): JSX.Element | null {
  return (
    <>
      <Typography color='black' fontSize={22} pb={4} mt={7} textAlign='center'>
        Frempco is a FREE roleplaying product for classroom teachers and their
        students. <br />
        Moshe Siegel maintains Frempco and you can email him at{' '}
        <Link
          sx={{ color: 'blue', textDecoration: 'none' }}
          href={
            'mailto:siegel.moshes@gmail.com?subject=Feedback%20on%20Frempco'
          }
        >
          siegel.moshes@gmail.com
        </Link>
      </Typography>
    </>
  );
}
