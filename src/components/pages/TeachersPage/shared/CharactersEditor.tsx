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
  const characterListTextArea = useRef<HTMLTextAreaElement | null>(null);

  const handleSave = () => {
    if (!characterListTextArea.current) return;

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
        multiline
        fullWidth
        minRows={5}
        autoFocus
        placeholder='One character per line'
        inputProps={{ 'aria-label': 'Edit characters' }}
        defaultValue={characters.join('\n')}
        inputRef={characterListTextArea}
        sx={{
          '& .MuiOutlinedInput-root': {
            alignItems: 'flex-start',
            backgroundColor: 'neutrals.white',
          },
        }}
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant='outlined' color='primary' onClick={handleSave}>
          Save Characters
        </Button>
      </Box>
    </Box>
  );
}
