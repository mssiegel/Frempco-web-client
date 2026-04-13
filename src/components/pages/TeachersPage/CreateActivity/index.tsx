import { Box, Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import PageHeader from '@components/shared/PageHeader';
import FrempcoBranding from '@components/shared/PageHeader/FrempcoBranding';

import SaveCharactersAccordion from './SaveCharactersAccordion';
import SetEmailAccordion from './SetEmailAccordion';

interface CreateActivityProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  handleCreateActivity: () => void;
}

export default function CreateActivity({
  characters,
  setCharacters,
  email,
  setEmail,
  handleCreateActivity,
}: CreateActivityProps): JSX.Element {
  return (
    <>
      <PageHeader
        statusText='Set up Activity'
        leftElement={<FrempcoBranding />}
      />
      <Box sx={{ my: 3, mx: 3 }}>
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
            onClick={() => handleCreateActivity()}
          >
            Host Activity Now
          </Button>
        </Box>
      </Box>
    </>
  );
}
