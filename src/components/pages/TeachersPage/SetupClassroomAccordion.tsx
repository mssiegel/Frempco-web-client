import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ErrorOutline as ErrorOutlineIcon,
} from '@mui/icons-material';

import SetTeacherEmailButton from './SetTeacherEmailButton';
import SetCharacterList from './SetCharacterList';

interface SetupClassroomAccordionProps {
  classroomName: string;
  characters: string[];
  setCharacters: Dispatch<SetStateAction<string[]>>;
}

function extractEmail(payload: any): string {
  // Try a few common shapes/keys
  const direct =
    payload?.email ??
    payload?.emailAddress ??
    payload?.teacherEmail ??
    payload?.teacher_email;

  const nested =
    payload?.classroom?.email ??
    payload?.classroom?.emailAddress ??
    payload?.classroom?.teacherEmail ??
    payload?.data?.email ??
    payload?.data?.classroom?.email;

  const found = direct ?? nested ?? '';
  return typeof found === 'string' ? found.trim() : '';
}

const SetupClassroomAccordion = ({
  classroomName,
  characters,
  setCharacters,
}: SetupClassroomAccordionProps) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;

  const [teacherEmail, setTeacherEmail] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  const missingFields = useMemo(() => {
    const missing: string[] = [];
    if (!teacherEmail) missing.push('email');
    if (characters.length === 0) missing.push('characters');
    return missing;
  }, [teacherEmail, characters.length]);

  async function fetchTeacherEmail() {
    try {
      // Most likely endpoint — adjust if your backend differs
      const res = await fetch(`${apiUrl}/classrooms/${classroomName}`, {
        method: 'GET',
      });
      if (!res.ok) return;

      const data = await res.json();
      const emailFromApi = extractEmail(data);
      if (emailFromApi) setTeacherEmail(emailFromApi);
    } catch {
      // Ignore; keep default "missing" state
    }
  }

  // Fetch when accordion opens (so it's fresh)
  useEffect(() => {
    if (!expanded) return;
    fetchTeacherEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, classroomName]);

  // While email is missing and accordion is open, poll briefly so it updates
  // right after SetTeacherEmailButton PATCHes the backend.
  useEffect(() => {
    if (!expanded) return;
    if (teacherEmail) return;

    const interval = setInterval(() => {
      fetchTeacherEmail();
    }, 1500);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, teacherEmail, classroomName]);

  return (
    <Accordion
      disableGutters
      sx={{ boxShadow: 'none', mb: 3 }}
      expanded={expanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          borderRadius: '15px',
          border: '1px solid black',
          gap: 2,
          alignItems: 'center',
        }}
      >
        {/* Header row */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography fontFamily="Lora" fontSize="26px">
            Step 1: Setup Your Classroom
          </Typography>

          {missingFields.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ErrorOutlineIcon fontSize="small" />
              <Typography fontFamily="Lora" fontSize="14px">
                Not yet set: {missingFields.join(', ')}
              </Typography>
            </Box>
          )}
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <SetTeacherEmailButton classroomName={classroomName} />
        <SetCharacterList characters={characters} setCharacters={setCharacters} />
      </AccordionDetails>
    </Accordion>
  );
};

export default SetupClassroomAccordion;
