/** @jsxImportSource @emotion/react */

import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { PersonOutline as PersonOutlineIcon } from '@mui/icons-material';

import BasicModal from '@components/shared/Modal';

interface SetCharacterListProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
}

export default function SetCharacterList({
  characters,
  setCharacters,
}: SetCharacterListProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const characterListTextArea = useRef<HTMLTextAreaElement>();

  const setCharacterList = () => {
    const characters = characterListTextArea.current.value.split('\n');
    const trimmedCharacters = characters
      .map((ch) => ch.trim())
      .filter((ch) => ch);

    if (trimmedCharacters.length === 0) {
      setError('Enter at least one character name.');
      return;
    }

    setCharacters(trimmedCharacters);
    setError(null);
    setOpen(false);
  };

  function handleClose() {
    setOpen(false);
    setError(null);
  }

  return (
    <>
      <Typography variant='body1' sx={{ mb: 1, mt: 1.5 }}>
        Characters: {characters.join(', ')}
      </Typography>
      <Button
        variant='contained'
        color='primary'
        startIcon={<PersonOutlineIcon />}
        onClick={() => setOpen(true)}
      >
        Edit Character List
      </Button>

      <BasicModal open={open} onClose={handleClose}>
        <TextField
          label='Character List'
          multiline
          fullWidth
          rows={8}
          autoFocus
          defaultValue={characters.join('\n')}
          inputRef={characterListTextArea}
        />

        {error && (
          <Typography
            variant='body1'
            color='error'
            sx={{ mt: 2, textAlign: 'center' }}
          >
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={setCharacterList}
          >
            Save
          </Button>
        </Box>
      </BasicModal>
    </>
  );
}
