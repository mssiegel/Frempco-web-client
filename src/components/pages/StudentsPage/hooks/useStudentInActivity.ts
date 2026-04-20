import { useEffect, useState } from 'react';

/**
 * Polls the server to detect if a student lost connection to the activity.
 * This typically happens if the student's smartphone screen goes dark. When
 * that happens, they should see a message to login again.
 *
 * @param activityPin - The activity PIN
 * @param sessionId - The student's persistent session ID
 * @returns true while the student is in the activity, false once we detect they were logged out
 */
export function useStudentInActivity(
  activityPin: string,
  sessionId: string,
): boolean {
  const [isStudentInActivity, setIsStudentInActivity] = useState(true);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
    const FIFTEEN_SECONDS = 15000;

    const connectionCheckInterval = setInterval(async () => {
      try {
        const getResponse = await fetch(
          `${apiUrl}/activities/${activityPin}/studentSockets/${sessionId}`,
          { method: 'GET' },
        );
        const { isStudentInsideActivity } = await getResponse.json();
        if (!isStudentInsideActivity) {
          setIsStudentInActivity(false);
          clearInterval(connectionCheckInterval);
        }
      } catch {
        // If the request fails, assume the connection was lost
        setIsStudentInActivity(false);
        clearInterval(connectionCheckInterval);
      }
    }, FIFTEEN_SECONDS);

    return () => clearInterval(connectionCheckInterval);
  }, [activityPin, sessionId]);

  return isStudentInActivity;
}
