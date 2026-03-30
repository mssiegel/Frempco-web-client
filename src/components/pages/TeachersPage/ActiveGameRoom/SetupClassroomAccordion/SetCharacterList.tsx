import { useState, Dispatch, SetStateAction } from 'react';
import { Button, Typography } from '@mui/material';
import { PersonOutline as PersonOutlineIcon } from '@mui/icons-material';

import BasicModal from '@components/shared/Modal';
import SharedCharactersEditor from '@TeachersPage/shared/CharactersEditor';

interface SetCharacterListProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
}

export default function SetCharacterList({
  characters,
  setCharacters,
}: SetCharacterListProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
        <SharedCharactersEditor
          characters={characters}
          setCharacters={setCharacters}
          onSave={() => setOpen(false)}
        />
      </BasicModal>
    </>
  );
}
