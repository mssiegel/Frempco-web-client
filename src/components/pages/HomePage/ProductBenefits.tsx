/** @jsxImportSource @emotion/react */

import { Typography, Box, List, ListItem, Grid } from '@mui/material';

export default function ProductBenefits({ isMobile }): JSX.Element | null {
  return (
    <Grid
      container
      sx={{
        pt: { xs: 7, md: 15 },
      }}
    >
      {/* Left margin - 1 column */}
      <Grid item md={1} />

      {/* Text content - 5 columns */}
      <Grid item md={5}>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          gap={4}
        >
          {/* Heading and subheading */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              gap: '16px',
              maxWidth: { xs: '316px', md: '628px' },
            }}
          >
            <Typography
              sx={{ typography: { xs: 'h4', md: 'h3' }, maxWidth: '584px' }}
            >
              Where Learning Feels Like Play (and Still Counts)
            </Typography>
            <Typography>
              Role-play, real conversation, and simple tools that make
              engagement effortless.
            </Typography>
          </Box>

          {/* Benefits list */}
          <List
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '16px',
              alignSelf: 'stretch',
              maxWidth: '705px',
            }}
          >
            <CustomListItem>
              The mystery of role-play makes learning more fun and engaging
            </CustomListItem>
            <CustomListItem>
              Teachers receive full chat transcripts by email after each session
            </CustomListItem>
            <CustomListItem>
              No accounts, no logins, no setup — just open the link and start
              learning
            </CustomListItem>
          </List>
        </Box>
      </Grid>

      {/* Image - 5 columns */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          padding: {
            xs: '32px 0', // Vertical spacing on mobile
            md: '0 0 0 64px', // Left padding to align with Roleplay image (in Hero section)
          },
          display: { xs: 'flex', md: 'block' },
          justifyContent: { xs: 'center', md: 'initial' },
        }}
      >
        <ComputerImage isMobile={isMobile} />
      </Grid>

      {/* Right margin - 1 column */}
      <Grid item md={1} />
    </Grid>
  );
}

function CustomListItem({ children }) {
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
          typography: { xs: 'body2', md: 'body1' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: '1 0 0',
          alignSelf: 'stretch',
        }}
      >
        {children}
      </Typography>
    </ListItem>
  );
}

function ComputerImage({ isMobile }) {
  return (
    // Actual image is applied as background on this Box to allow the squiggly accent to be positioned on top of it more easily
    <Box
      sx={{
        width: { xs: '344px', md: '538px' },
        height: 'auto',
        aspectRatio: '269/165',
        background: {
          xs: 'url(/homepage-computer.jpg) lightgray -116.345px -180.777px / 166.504% 271.618% no-repeat',
          md: 'url(/homepage-computer.jpg) lightgray -181.958px -282.732px / 166.504% 271.618% no-repeat',
        },
        position: 'relative', // To position the squiggly SVG absolutely within this Box
      }}
    >
      <Box
        sx={{
          right: 6,
          top: { xs: -24, md: -48 },
          position: 'absolute',
        }}
      >
        {isMobile ? squigglySVGMobile : squigglySVGDesktop}
      </Box>
    </Box>
  );
}

/**
 * SVGs for the star bullet points and the squiggly accent on the computer image.
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

const squigglySVGDesktop = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='70'
    height='81'
    viewBox='0 0 70 81'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M60.0448 78.8843C73.0298 70.5456 72.8131 44.7702 59.7068 36.501C57.5038 35.1052 57.3917 34.9995 57.1572 33.4288C55.7453 24.298 45.716 14.6264 36.4263 13.4515C34.7567 13.2264 34.6446 13.1207 33.4127 10.9361C22.328 -8.82296 -1.0768 -0.0827793 0.0384478 23.3722C0.38035 30.3574 6.37614 30.2869 6.40641 22.3883C6.45228 3.4805 19.3837 -2.55029 27.5552 12.515L28.1228 13.5759L24.8997 14.9827C16.5392 18.6334 14.2471 29.783 21.2284 33.057C29.3704 36.8859 37.8535 28.6626 35.9844 18.6744C35.655 16.9431 35.655 16.9431 38.4276 18.2794C44.4738 21.1119 53.9719 33.5077 50.01 33.3797C36.2573 32.9394 28.685 50.133 41.2403 53.2939C47.1297 54.771 53.1905 50.6846 56.0558 43.2721C57.2425 40.2146 57.4525 40.2848 59.9723 44.1954C66.8503 54.8588 63.957 73.0417 54.566 78.1356C50.4199 80.3625 55.76 81.6482 60.0448 78.8843ZM42.9546 49.7537C38.7659 48.5878 42.6095 37.9497 47.513 37.1049C51.1622 36.4693 51.5278 36.9703 50.3875 41.1796C48.9544 46.4197 45.4613 50.4557 42.9546 49.7537ZM25.2564 30.0935C22.255 28.8398 23.4257 21.7469 27.1301 18.7056C29.3854 16.8691 29.5628 16.9514 29.7612 19.7524C30.0942 25.2801 27.5794 31.1052 25.2564 30.0935Z'
      fill='#BFE35B'
    />
  </svg>
);

const squigglySVGMobile = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='48'
    height='55'
    viewBox='0 0 48 55'
    fill='none'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M40.8159 53.6222C49.6426 47.9539 49.4953 30.4328 40.5862 24.8118C39.0886 23.863 39.0125 23.7912 38.853 22.7234C37.8933 16.5167 31.0758 9.94237 24.7611 9.14372C23.6261 8.99074 23.5499 8.91884 22.7126 7.43386C15.1777 -5.9975 -0.731943 -0.0563016 0.0261533 15.8874C0.258562 20.6356 4.33425 20.5877 4.35482 15.2186C4.386 2.36587 13.1763 -1.73362 18.7309 8.50716L19.1167 9.22827L16.9258 10.1846C11.2427 12.6662 9.68461 20.2452 14.4302 22.4707C19.9648 25.0734 25.7312 19.4836 24.4607 12.694C24.2367 11.5172 24.2367 11.5172 26.1214 12.4255C30.2314 14.3509 36.6878 22.7771 33.9947 22.69C24.6462 22.3907 19.4988 34.0782 28.0334 36.2269C32.0368 37.231 36.1567 34.4532 38.1044 29.4145C38.911 27.3362 39.0538 27.3839 40.7666 30.0422C45.442 37.2906 43.4753 49.6506 37.0917 53.1132C34.2733 54.627 37.9033 55.5009 40.8159 53.6222ZM29.1987 33.8204C26.3514 33.0279 28.9641 25.7966 32.2973 25.2223C34.7779 24.7902 35.0264 25.1308 34.2513 27.9921C33.2772 31.5541 30.9027 34.2976 29.1987 33.8204ZM17.1683 20.4562C15.1281 19.604 15.9238 14.7826 18.4419 12.7152C19.975 11.4668 20.0956 11.5228 20.2304 13.4268C20.4568 17.1843 18.7473 21.1439 17.1683 20.4562Z'
      fill='#BFE35B'
    />
  </svg>
);
