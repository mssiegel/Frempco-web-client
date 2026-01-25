import { useEffect, useState } from 'react';

/**
 * Polls the server to detect if a student lost connection to the classroom.
 * This typically happens if the student's smartphone screen goes dark. When
 * that happens, they should see a message to login again.
 *
 * @param classroomName - The classroom name
 * @param socketId - The student's socket ID
 * @returns true while the student is in the classroom, false once we detect they were logged out
 */
export function useStudentInClassroom(
  classroomName: string,
  socketId: string,
): boolean {
  const [isStudentInClassroom, setIsStudentInClassroom] = useState(true);

  useEffect(() => {
    const apiUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1`;
    const FIFTEEN_SECONDS = 15000;

    const connectionCheckInterval = setInterval(async () => {
      try {
        const getResponse = await fetch(
          `${apiUrl}/classrooms/${classroomName}/studentSockets/${socketId}`,
          { method: 'GET' },
        );
        const { isStudentInsideClassroom } = await getResponse.json();
        if (!isStudentInsideClassroom) {
          setIsStudentInClassroom(false);
          clearInterval(connectionCheckInterval);
        }
      } catch {
        // If the request fails, assume the connection was lost
        setIsStudentInClassroom(false);
        clearInterval(connectionCheckInterval);
      }
    }, FIFTEEN_SECONDS);

    return () => clearInterval(connectionCheckInterval);
  }, [classroomName, socketId]);

  return isStudentInClassroom;
}
