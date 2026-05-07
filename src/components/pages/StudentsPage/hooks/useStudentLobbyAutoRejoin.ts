import { useEffect, useRef, useState } from 'react';

import { checkStudentIsInsideActivity } from './useStudentInActivity';

const REJOIN_CONFIRMATION_DELAY_MS = 1000;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function useStudentLobbyAutoRejoin(
  activityPin: string,
  sessionId: string,
  {
    disabled = false,
    rejoinStudent,
  }: {
    disabled?: boolean;
    rejoinStudent: () => void;
  },
) {
  const [status, setStatus] = useState<
    'connected' | 'rejoining' | 'rejoinFailed'
  >('connected');
  const isRejoining = useRef(false);

  useEffect(() => {
    if (disabled) return;

    async function attemptAutoRejoin() {
      if (isRejoining.current) return;

      isRejoining.current = true;

      try {
        setStatus('rejoining');
        // TODO: instead of running a separate check, see if rejoinStudent can return a success/failure response that we can use to set the status immediately
        rejoinStudent();
        await wait(REJOIN_CONFIRMATION_DELAY_MS);

        const isStudentInsideActivity = await checkStudentIsInsideActivity(
          activityPin,
          sessionId,
        );
        setStatus(isStudentInsideActivity ? 'connected' : 'rejoinFailed');
      } catch {
        setStatus('rejoinFailed');
      } finally {
        isRejoining.current = false;
      }
    }

    async function checkMembership() {
      if (isRejoining.current) return;

      try {
        const isStudentInsideActivity = await checkStudentIsInsideActivity(
          activityPin,
          sessionId,
        );

        if (isStudentInsideActivity) {
          setStatus('connected');
          return;
        }

        attemptAutoRejoin();
      } catch {
        setStatus('rejoinFailed');
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') checkMembership();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activityPin, disabled, rejoinStudent, sessionId]);

  return status;
}
