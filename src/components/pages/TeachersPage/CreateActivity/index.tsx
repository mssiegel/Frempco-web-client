import { Box, Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import PageHeader from '@components/shared/PageHeader';
import FrempcoBranding from '@components/shared/PageHeader/FrempcoBranding';
import { TEST_ACTIVITY_PIN } from '@utils/activities';

import SaveCharactersAccordion from './SaveCharactersAccordion';
import SetEmailAccordion from './SetEmailAccordion';

interface CreateActivityProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleCreateActivity: (activityPin: string) => void;
  isMobile: boolean;
}

export default function CreateActivity({
  characters,
  setCharacters,
  email,
  setEmail,
  handleCreateActivity,
  isMobile,
}: CreateActivityProps): JSX.Element {
  const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

  const create4DigitPin = (): string =>
    Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');

  return (
    <>
      <PageHeader
        statusText='Set up Activity'
        leftElement={<FrempcoBranding />}
        isSticky={true}
      />
      <Box
        sx={{
          px: 3,
          py: isMobile ? 3 : 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 760 }}>
          {isDevelopment && (
            <Box display='flex' justifyContent='center' mb={3}>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => handleCreateActivity(TEST_ACTIVITY_PIN)}
              >
                Create Test Activity
              </Button>
            </Box>
          )}

          <Box
            sx={{
              borderRadius: '24px',
              px: isMobile ? 3 : 5,
              py: isMobile ? 3 : 4,
              background: (theme) =>
                `linear-gradient(180deg, ${theme.palette.neutrals.white} 0%, ${theme.palette.primary[200]} 100%)`,
              border: '1px solid',
              borderColor: 'primary.300',
            }}
          >
            <Typography variant='h3' mb={1} textAlign='center'>
              Set up your Activity
            </Typography>

            <Typography
              variant='body2'
              color='text.secondary'
              textAlign='center'
              sx={{ mb: 4 }}
            >
              Choose your characters, set your email, and then host the
              activity.
            </Typography>

            <SaveCharactersAccordion
              characters={characters}
              setCharacters={setCharacters}
            />

            <SetEmailAccordion email={email} setEmail={setEmail} />

            <Box
              sx={{
                mt: 3,
                mb: 4,
                px: 2,
                py: 2.5,
                borderRadius: '18px',
                backgroundColor: 'neutrals.white',
                border: '1px solid',
                borderColor: 'primary.200',
              }}
            >
              <Typography variant='body2' sx={{ mb: 1 }}>
                <strong>Characters:</strong> {characters.join(', ')}
              </Typography>

              <Typography variant='body2'>
                <strong>Email:</strong> {email || 'Not set'}
              </Typography>
            </Box>

            <Box display='flex' justifyContent='center'>
              <Button
                variant='outlined'
                color='primary'
                type='submit'
                onClick={() => handleCreateActivity(create4DigitPin())}
                sx={{
                  minHeight: 64,
                  minWidth: isMobile ? '100%' : 320,
                  px: 5,
                  fontSize: '22px',
                  fontWeight: 400,
                }}
              >
                Host Activity
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
