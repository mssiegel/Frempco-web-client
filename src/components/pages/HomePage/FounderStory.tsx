import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import founderPhoto from '../../../../public/HomePage/founder-photo.jpg';
import Link from '@components/shared/Link';

interface FounderStoryProps {
  isMobile: boolean;
}

export default function FounderStory({
  isMobile,
}: FounderStoryProps): JSX.Element {
  return (
    <Grid container sx={{ my: isMobile ? 4 : 0 }}>
      {/* Left margin - 1 column */}
      <Grid item md={1} />

      {/* Left content - 4 columns */}
      <Grid item md={4} sx={{ margin: 'auto' }}>
        <FounderPhoto isMobile={isMobile} />
      </Grid>

      {/* Spacing - 1 column */}
      <Grid item md={1} />

      {/* Right content - 5 columns */}
      <Grid item md={5} sx={{ mt: isMobile ? 4 : 0 }}>
        <Typography variant={isMobile ? 'h4' : 'h3'}>
          How Frempco came about
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }}>
          I&apos;m Moshe and I volunteer at the English department at a high
          school in Bet Shemesh, Israel. Because I’ve enjoyed playing
          multiplayer video games like Warcraft and Brawl Stars, I wanted to
          create a multiplayer learning activity for my students, the kind of
          game I would have loved to play in high school.
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Frempco stands for <strong>Fr</strong>iendship, <strong>Emp</strong>
          owerment, and <strong>Co</strong>mmunity. I hope you use Frempco to
          empower your classmates, strengthen your friendships, and build up
          your feeling of being in a school community.
        </Typography>
        <Typography variant='body2' sx={{ mt: 2 }}>
          Sincerely,
        </Typography>
        <Typography variant='body2'>Moshe Siegel</Typography>
        <Typography variant='body2'>
          Email:{' '}
          <Link href='mailto:siegel.moshes@gmail.com?subject=Thoughts%20on%20Frempco'>
            siegel.moshes@gmail.com
          </Link>
        </Typography>
      </Grid>

      {/* Right margin - 1 column */}
      <Grid item md={1} />
    </Grid>
  );
}

function FounderPhoto({ isMobile }: FounderStoryProps): JSX.Element {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: isMobile ? '100%' : '400px',
        margin: '0 auto',
      }}
    >
      <Image
        src={founderPhoto}
        alt='Founder photo'
        priority
        style={{
          width: '100%',
          height: 'auto',
          border: '1px solid silver',
          borderRadius: '18px',
        }}
      />
      <Typography
        variant='caption'
        color='text.secondary'
        sx={{ display: 'block', mt: 0.5, textAlign: 'center' }}
      >
        Moshe Siegel
      </Typography>
    </Box>
  );
}
