import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

type UserCtxType = {
  user: { name: string };
  setUser: Dispatch<SetStateAction<{ name: string }>>;
};

const UserContext = createContext<UserCtxType>({
  user: { name: '' },
  setUser: () => {},
});

function UserProvider({ children }: ProviderProps) {
  const [user, setUser] = useState({
    name: '',
  });

  const userState = { user, setUser };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
