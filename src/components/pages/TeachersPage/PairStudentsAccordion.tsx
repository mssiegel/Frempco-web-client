import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import {
  ErrorOutline as NotificationIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const PairStudentsAccordion = ({ count }: { count: number }) => (
  <Accordion disableGutters sx={{ boxShadow: 'none' }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      id='pair-students-accordion'
      sx={{ borderRadius: '15px', border: '1px solid black', gap: 2 }}
    >
      <Typography fontFamily='Lora' fontSize='26px'>
        Step 1: Pair Your Students ({count})
      </Typography>
      <Box
        display='flex'
        alignItems='center'
        gap={1}
        flexGrow={1}
        justifyContent='flex-end'
      >
        <NotificationIcon />
        <Typography fontFamily='Lora' fontSize='16px'>
          There are <strong>{count} students</strong> waiting to start
        </Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails>
      <Typography fontFamily='Lora' fontSize='17px'>
        Students are paired up automatically as they enter the classroom, but
        you can adjust pairings by dragging and dropping names.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default PairStudentsAccordion;
