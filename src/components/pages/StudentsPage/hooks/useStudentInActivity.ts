import { useEffect, useState } from 'react';
import { STUDENT_CONNECTION_CHECK_INTERVAL } from '@utils/activities';

export async function checkStudentIsInsideActivity(
  activityPin: string,
  sessionId: string,
): Promise<boolean> {
  const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
  const getResponse = await fetch(
    `${apiUrl}/activities/${activityPin}/students/${sessionId}`,
    { method: 'GET' },
  );
  const { isStudentInsideActivity } = await getResponse.json();
  return Boolean(isStudentInsideActivity);
}

export function useStudentInActivity(
  activityPin: string,
  sessionId: string,
): boolean {
  const [isStudentInActivity, setIsStudentInActivity] = useState(true);

  useEffect(() => {
    const connectionCheckInterval = setInterval(async () => {
      try {
        const isStudentInsideActivity = await checkStudentIsInsideActivity(
          activityPin,
          sessionId,
        );

        if (!isStudentInsideActivity) {
          setIsStudentInActivity(false);
          clearInterval(connectionCheckInterval);
        }
      } catch {
        setIsStudentInActivity(false);
        clearInterval(connectionCheckInterval);
      }
    }, STUDENT_CONNECTION_CHECK_INTERVAL);

    return () => clearInterval(connectionCheckInterval);
  }, [activityPin, sessionId]);

  return isStudentInActivity;
}
