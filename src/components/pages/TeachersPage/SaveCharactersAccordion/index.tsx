import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';

import CharactersEditor from './CharactersEditor';

const CHARACTERS = [
  'Perfectionist dentist',
  'Pirate captain',
  'Tiny warlord',
  'Dance teacher',
  'Forgetful surgeon',
  'Party planner',
];

const SaveCharactersAccordion = (): JSX.Element => {
  const [characters, setCharacters] = useState<string[]>(CHARACTERS);
  const [isCharactersAccordionOpen, setIsCharactersAccordionOpen] =
    useState(true);

  const handleCharactersAccordionChange = (
    _event: SyntheticEvent,
    expanded: boolean,
  ): void => {
    setIsCharactersAccordionOpen(expanded);
  };

  return (
    <Accordion
      disableGutters
      expanded={isCharactersAccordionOpen}
      onChange={handleCharactersAccordionChange}
      sx={{ maxWidth: 700, boxShadow: 'none' }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ borderRadius: '15px', border: '1px solid black', mb: 1 }}
      >
        <Typography variant='h6'>Save Characters</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <CharactersEditor
          characters={characters}
          setCharacters={setCharacters}
          onSave={() => setIsCharactersAccordionOpen(false)}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default SaveCharactersAccordion;
