import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';

import CharactersEditor from './CharactersEditor';

interface SaveCharactersAccordionProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
}

const SaveCharactersAccordion = ({
  characters,
  setCharacters,
}: SaveCharactersAccordionProps): JSX.Element => {
  const [isCharactersAccordionOpen, setIsCharactersAccordionOpen] =
    useState(false);

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
        <Typography variant='h6'>Edit Characters List</Typography>
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
