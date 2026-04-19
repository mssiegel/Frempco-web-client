import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';

import SharedCharactersEditor from '@TeachersPage/shared/CharactersEditor';
interface SaveCharactersAccordionProps {
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
}

const SaveCharactersAccordion = ({
  characters,
  setCharacters,
}: SaveCharactersAccordionProps): JSX.Element => {
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
      sx={{
        mb: 2,
        boxShadow: 'none',
        '&:before': { display: 'none' },
        overflow: 'hidden',
        borderRadius: '18px',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          px: 3,
          minHeight: 64,
          borderRadius: isCharactersAccordionOpen ? '18px 18px 0 0' : '18px',
          backgroundColor: 'primary.500',
          color: 'neutrals.white',
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: 'neutrals.white',
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            my: 1.5,
          },
        }}
      >
        <Typography variant='h6'>Edit Characters</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 3, backgroundColor: 'primary.300' }}>
        <Typography variant='body2' mb={2}>
          Update the characters which your students can get assigned to.
        </Typography>
        <SharedCharactersEditor
          characters={characters}
          setCharacters={setCharacters}
          onSave={() => setIsCharactersAccordionOpen(false)}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default SaveCharactersAccordion;
