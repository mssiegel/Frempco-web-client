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
  // Tracks the current "generation" of visibility-change calls. Each new visibility
  // change increments the counter so that stale async operations from earlier calls
  // can detect they've been superseded and bail out before updating state.
  const callGeneration = useRef(0);

  useEffect(() => {
    if (disabled) return;

    async function attemptAutoRejoin(generation: number) {
      if (callGeneration.current !== generation) return;

      try {
        setStatus('rejoining');
        // TODO: instead of running a separate check, see if rejoinStudent can return a success/failure response that we can use to set the status immediately
        rejoinStudent();
        await wait(REJOIN_CONFIRMATION_DELAY_MS);

        if (callGeneration.current !== generation) return;

        const isStudentInsideActivity = await checkStudentIsInsideActivity(
          activityPin,
          sessionId,
        );

        if (callGeneration.current !== generation) return;
        setStatus(isStudentInsideActivity ? 'connected' : 'rejoinFailed');
      } catch {
        if (callGeneration.current === generation) setStatus('rejoinFailed');
      }
    }

    async function checkMembership(generation: number) {
      try {
        const isStudentInsideActivity = await checkStudentIsInsideActivity(
          activityPin,
          sessionId,
        );

        if (callGeneration.current !== generation) return;

        if (isStudentInsideActivity) {
          setStatus('connected');
          return;
        }

        attemptAutoRejoin(generation);
      } catch {
        if (callGeneration.current === generation) setStatus('rejoinFailed');
      }
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        callGeneration.current += 1;
        checkMembership(callGeneration.current);
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [activityPin, disabled, rejoinStudent, sessionId]);

  return status;
}
