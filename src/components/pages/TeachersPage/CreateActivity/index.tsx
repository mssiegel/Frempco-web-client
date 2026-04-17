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
}

export default function CreateActivity({
  characters,
  setCharacters,
  email,
  setEmail,
  handleCreateActivity,
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
      <Box sx={{ my: 3, mx: 3 }}>
        {isDevelopment && (
          <Box display='flex' justifyContent='center' mb={3}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => handleCreateActivity(TEST_ACTIVITY_PIN)}
            >
              Create Test Classroom
            </Button>
          </Box>
        )}
        <Typography variant='h3' mb={3}>
          Set up your Activity
        </Typography>

        <SaveCharactersAccordion
          characters={characters}
          setCharacters={setCharacters}
        />

        <SetEmailAccordion email={email} setEmail={setEmail} />

        <Typography variant='body2' sx={{ m: 1 }}>
          <strong>Characters:</strong> {characters.join(', ')}
        </Typography>

        <Typography variant='body2' sx={{ m: 1 }}>
          <strong>Email:</strong> {email || 'Not set'}
        </Typography>

        <Box mt={3}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            onClick={() => handleCreateActivity(create4DigitPin())}
          >
            Host Activity Now
          </Button>
        </Box>
      </Box>
    </>
  );
}
