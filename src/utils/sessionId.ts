const SESSION_ID_STORAGE_KEY = 'frempco-session-id';

function getSessionStorage(): Storage {
  if (typeof window === 'undefined') {
    throw new Error('Session IDs can only be used in the browser.');
  }

  return window.sessionStorage;
}

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
  const existingSessionId = getSessionId();

  if (existingSessionId) {
    return existingSessionId;
  }

  const sessionId = createSessionId();
  getSessionStorage().setItem(SESSION_ID_STORAGE_KEY, sessionId);

  return sessionId;
}

export function getSessionId(): string | null {
  return getSessionStorage().getItem(SESSION_ID_STORAGE_KEY);
}

export function clearSessionId(): void {
  getSessionStorage().removeItem(SESSION_ID_STORAGE_KEY);
}
