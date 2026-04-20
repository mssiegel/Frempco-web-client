const SESSION_ID_STORAGE_KEY = 'frempco-session-id';

function createSessionId(): string {
  if (
    typeof crypto === 'undefined' ||
    typeof crypto.randomUUID !== 'function'
  ) {
    throw new Error(
      'Secure session ID generation is unavailable in this browser.',
    );
  }

  return crypto.randomUUID();
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    throw new Error('Session IDs can only be created in the browser.');
  }

  const existingSessionId = window.sessionStorage.getItem(
    SESSION_ID_STORAGE_KEY,
  );

  if (existingSessionId) {
    return existingSessionId;
  }

  const sessionId = createSessionId();
  window.sessionStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId);

  return sessionId;
}
