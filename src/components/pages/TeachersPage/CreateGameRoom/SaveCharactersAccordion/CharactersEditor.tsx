import { Box, Button, TextField, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

type CharactersEditorProps = {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  onSave: () => void;
};

export default function CharactersEditor({
  characters,
  setCharacters,
  onSave,
}: CharactersEditorProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const characterListTextArea = useRef<HTMLTextAreaElement | null>(null);

  const saveCharacterList = () => {
    const nextCharacters =
      characterListTextArea.current?.value.split('\n') || [];
    const trimmedCharacters = nextCharacters
      .map((character) => character.trim())
      .filter((character) => character);

    if (trimmedCharacters.length === 0) {
      setError('Enter at least one character name.');
      return;
    }

    setCharacters(trimmedCharacters);
    setError(null);
    onSave();
  };

  return (
    <>
      <Box sx={{ maxWidth: 400 }}>
        <Typography variant='body2' mb={2}>
          Update the characters which your students can get assigned to.
        </Typography>
        <TextField
          label='Edit Character List'
          multiline
          fullWidth
          rows={6}
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

        <Button
          variant='contained'
          color='primary'
          onClick={saveCharacterList}
          sx={{ m: 2 }}
        >
          Save characters
        </Button>
      </Box>
    </>
  );
}
