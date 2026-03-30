import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface SharedCharactersEditorProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
  onSave: () => void;
}

export default function SharedCharactersEditor({
  characters,
  setCharacters,
  onSave,
}: SharedCharactersEditorProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const characterListTextArea = useRef<HTMLTextAreaElement>();

  const handleSave = () => {
    const chars = characterListTextArea.current.value.split('\n');
    const trimmedCharacters = chars.map((ch) => ch.trim()).filter((ch) => ch);

    if (trimmedCharacters.length === 0) {
      setError('Enter at least one character name.');
      return;
    }

    setCharacters(trimmedCharacters);
    setError(null);
    onSave();
  };

  return (
    <Box>
      <TextField
        label={'Edit Character List'}
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

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button variant='contained' color='primary' onClick={handleSave}>
          Save characters
        </Button>
      </Box>
    </Box>
  );
}
