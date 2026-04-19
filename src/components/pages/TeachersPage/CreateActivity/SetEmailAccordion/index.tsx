import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { SyntheticEvent, useState } from 'react';

import EmailEditor from '@TeachersPage/shared/EmailEditor';

interface SetEmailAccordionProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
}

export default function SetEmailAccordion({
  email,
  setEmail,
}: SetEmailAccordionProps): JSX.Element {
  const [isEmailAccordionOpen, setIsEmailAccordionOpen] = useState(false);

  const handleEmailAccordionChange = (
    _event: SyntheticEvent,
    expanded: boolean,
  ): void => {
    setIsEmailAccordionOpen(expanded);
  };

  return (
    <Accordion
      disableGutters
      expanded={isEmailAccordionOpen}
      onChange={handleEmailAccordionChange}
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
          borderRadius: isEmailAccordionOpen ? '18px 18px 0 0' : '18px',
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
        <Typography variant='h6'>Set Email</Typography>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          px: 3,
          py: 3,
          backgroundColor: 'primary.300',
        }}
      >
        <EmailEditor
          email={email}
          onSave={(emailAddress) => {
            if (emailAddress !== email) setEmail(emailAddress);
            setIsEmailAccordionOpen(false);
          }}
        />
      </AccordionDetails>
    </Accordion>
  );
}
