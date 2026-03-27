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
      <Typography variant='body2' sx={{ mb: 2 }}>
        <strong>Characters:</strong> {characters.join(', ')}
      </Typography>

      <Box sx={{ maxWidth: 400 }}>
        <TextField
          label='Edit Character List'
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
            onClick={saveCharacterList}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}
