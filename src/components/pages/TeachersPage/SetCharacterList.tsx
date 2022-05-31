/** @jsxImportSource @emotion/react */

import { useState, useRef } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { PersonOutline as PersonOutlineIcon } from '@mui/icons-material';

import BasicModal from '@components/shared/Modal';

export default function SetCharacterList({ characters, setCharacters }) {
  const [open, setOpen] = useState(false);
  const characterListTextArea = useRef<HTMLTextAreaElement>();

  const setCharacterList = () => {
    const characters = characterListTextArea.current.value.split('\n');
    const trimmedCharacters = characters
      .map((ch) => ch.trim())
      .filter((ch) => ch);

    setCharacters(trimmedCharacters);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant='contained'
        size='large'
        color='success'
        startIcon={<PersonOutlineIcon />}
        onClick={() => setOpen(true)}
      >
        Set Character List
      </Button>

      <BasicModal open={open} onClose={() => setOpen(false)}>
        <TextField
          label='Character List'
          multiline
          fullWidth
          rows={8}
          autoFocus
          defaultValue={characters.join('\n')}
          inputRef={characterListTextArea}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Button variant='contained' size='large' onClick={setCharacterList}>
            Save
          </Button>
        </Box>
      </BasicModal>
    </>
  );
}
