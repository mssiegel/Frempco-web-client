import { Typography, Box, List, ListItem, Grid } from '@mui/material';
import Image from 'next/image';
import teacherViewImage from '../../../../public/HomePage/teacher-view-of-a-chat.png';

export default function ProductBenefits({
  isMobile,
}: {
  isMobile: boolean;
}): JSX.Element {
  return (
    <Grid container sx={{ pt: isMobile ? 7 : 15 }}>
      {/* Left margin - 1 column */}
      <Grid item md={1} />

      {/* Text content - 5 columns */}
      <Grid item md={5}>
        <Box display='flex' flexDirection='column' gap={4}>
          {/* Heading and subheading */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '16px',
              maxWidth: isMobile ? '316px' : '628px',
            }}
          >
            <Typography sx={{ typography: isMobile ? 'h4' : 'h3' }}>
              Where Learning Feels Like Play
            </Typography>
            <Typography>
              Students engagement soars as they wonder who they are chatting
              with.
            </Typography>
          </Box>

          {/* Benefits list */}
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <CustomListItem
              text='Classmates step into character and have conversations with each other.'
              isMobile={isMobile}
            />
            <CustomListItem
              text='Teachers sees all the sessions in real-time and will also receive a copy by email.'
              isMobile={isMobile}
            />
            <CustomListItem
              text='The conversations show how well each student understands the topic.'
              isMobile={isMobile}
            />
          </List>
        </Box>
      </Grid>

      {/* Spacing - 1 column */}
      <Grid item md={1} />

      {/* Image - 4 columns */}
      <Grid item md={4} sx={{ margin: 'auto', mt: isMobile ? 4 : 0 }}>
        <Image
          src={teacherViewImage}
          alt='Teacher view of a chat between two students'
          priority={true}
          style={{
            maxWidth: isMobile ? '100%' : '500px',
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
          A teacher viewing a chat between two students.
        </Typography>
      </Grid>

      {/* Right margin - 1 column */}
      <Grid item md={1} />
    </Grid>
  );
}

function CustomListItem({
  text,
  isMobile,
}: {
  text: string;
  isMobile: boolean;
}): JSX.Element {
  return (
    <ListItem
      sx={{
        display: 'flex',
        gap: '16px',
        padding: 0,
        alignItems: 'flex-start',
      }}
    >
      {starSVG}
      <Typography
        sx={{
          typography: isMobile ? 'body2' : 'body1',
          flex: '1 0 0',
        }}
      >
        {text}
      </Typography>
    </ListItem>
  );
}

/**
 * SVGs for the star bullet points.
 * Note: If these end up reused elsewhere, it could be a good idea to move them to their own files/components.
 */

const starSVG = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='23'
    height='24'
    viewBox='0 0 23 24'
    fill='none'
  >
    <path
      d='M17.4104 17.439C21.6641 20.9998 23.2914 22.8044 22.518 23.0945C22.1152 23.2395 21.938 23.2073 21.229 22.8689C19.8595 22.1922 14.8807 17.9385 14.8807 17.439C14.8807 16.7462 16.5564 16.73 17.4104 17.439Z'
      fill='#F79009'
    />
    <path
      d='M6.24453 17.3101C6.77624 17.6646 6.74402 17.729 4.68163 19.9687C3.58599 21.1772 2.68376 21.9344 2.02315 22.2245C1.12085 22.6273 0.685802 22.0794 1.04028 21.6283C4.06936 17.729 5.32613 16.6979 6.24453 17.3101Z'
      fill='#F79009'
    />
    <path
      d='M20.5846 12.0575C19.6017 12.3476 14.5748 13.9427 14.2042 14.0877C14.027 14.1521 13.8981 14.4744 13.8336 15.0222C13.3019 19.1147 12.4639 23.3202 12.0933 23.7874C11.8194 24.1419 10.8849 24.0291 10.6271 23.6263C10.3693 23.2235 9.17697 19.147 8.46803 16.1823L8.00093 14.2488C-1.15098 11.3486 -1.6505 11.413 2.49039 10.1402L6.148 9.01229C8.2265 8.3678 8.27468 8.35185 8.38746 7.83625C8.54859 7.09509 9.59589 3.48576 9.9987 1.76174C10.8527 -1.9441 12.593 0.343849 14.1236 7.23994L14.4781 8.81895C14.6715 8.85117 15.8958 8.96396 21.1807 10.1079C22.3891 10.3818 22.0347 11.6386 20.5846 12.0575ZM18.2966 11.268C18.1677 11.1552 14.6391 10.3013 13.9462 10.3013C13.1084 10.3013 12.915 9.89847 11.9644 6.11207C11.336 3.61466 11.2879 3.56648 10.9334 5.01659C10.4984 6.83729 9.61201 8.96396 9.49922 9.46344C9.40254 9.91459 8.50025 10.2368 5.00386 11.0747C3.24769 11.4936 2.97378 11.6386 3.63431 11.832C4.45604 12.0736 8.40358 13.3626 8.85472 13.3626C9.28976 13.3626 9.66034 13.6849 9.78924 14.1682L11.046 19.0664C11.2716 19.9204 11.2717 19.9204 11.9001 16.5851C12.6252 12.8309 12.5445 12.9922 13.7046 12.7505C15.1547 12.4444 18.4416 11.3969 18.2966 11.268Z'
      fill='#F79009'
    />
    <path
      d='M15.3642 6.98212C15.3642 6.62765 19.6178 2.32565 20.214 2.08396C21.4707 1.56837 21.793 2.24525 20.794 3.32478C18.1033 6.27334 15.3642 8.10998 15.3642 6.98212Z'
      fill='#F79009'
    />
    <path
      d='M2.95768 5.95091C-0.135906 3.8563 -0.490395 3.37293 1.0564 3.37293C1.81368 3.37293 6.599 6.69207 6.45399 7.12711C6.22841 7.80383 5.14888 7.44935 2.95768 5.95091Z'
      fill='#F79009'
    />
  </svg>
);
