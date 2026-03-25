import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

export default function SetEmailAccordion(): JSX.Element {
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
			sx={{ maxWidth: 700, boxShadow: 'none' }}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				sx={{ borderRadius: '15px', border: '1px solid black', mb: 1 }}
			>
				<Typography variant='h6'>Set Email</Typography>
			</AccordionSummary>

			<AccordionDetails>
				<Typography>TODO: email setting goes here</Typography>
			</AccordionDetails>
		</Accordion>
	);
}
