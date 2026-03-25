import {
  Box,
  Typography,
} from '@mui/material';
import SaveCharactersAccordion from './SaveCharactersAccordion/index';

export default function TeachersPage(): JSX.Element {
  return (
    <Box sx={{ mt: 3, ml: 3 }}>
      <Typography variant='h3' mb={3}>
        Create a Gameroom
      </Typography>

      <SaveCharactersAccordion />
    </Box>
  );
}
