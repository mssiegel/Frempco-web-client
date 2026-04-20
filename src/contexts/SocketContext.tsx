import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { getOrCreateSessionId } from '@utils/sessionId';

interface ProviderProps {
  children: React.ReactNode;
}

interface SocketContextValue {
  socket: Socket;
  sessionId: string;
  isReady: boolean;
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const SocketContext = createContext<SocketContextValue | null>(null);

function useSocketConnection(): SocketContextValue {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      'useSocketConnection must be used within a SocketProvider.',
    );
  }

  return context;
}

function SocketProvider({ children }: ProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const resolvedSessionId = getOrCreateSessionId();
    const socketInstance = io(SERVER_URL, {
      auth: { sessionId: resolvedSessionId },
    });

    setSessionId(resolvedSessionId);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  if (!socket || !sessionId) {
    return null;
  }

  const contextValue = {
    socket,
    sessionId,
    isReady: true,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider, useSocketConnection };
