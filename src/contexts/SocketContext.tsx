import { createContext } from 'react';
import { io } from 'socket.io-client';

interface ProviderProps {
  children: React.ReactNode;
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const socket = io(SERVER_URL);

const SocketContext = createContext(socket);

function SocketProvider({ children }: ProviderProps) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
