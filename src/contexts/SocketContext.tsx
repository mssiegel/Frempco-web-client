import { createContext } from 'react';
import { io } from 'socket.io-client';

interface ProviderProps {
  children: React.ReactNode;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
const socket = io(SOCKET_URL);

const SocketContext = createContext(socket);

function SocketProvider({ children }: ProviderProps) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
