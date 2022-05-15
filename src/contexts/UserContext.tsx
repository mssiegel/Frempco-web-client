import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

type UserCtxType = {
  user: { isLoggedIn: boolean; name: string };
  setUser: Dispatch<SetStateAction<{ isLoggedIn?: boolean; name?: string }>>;
};

const UserContext = createContext<UserCtxType>({
  user: { isLoggedIn: false, name: '' },
  setUser: () => {},
});

function UserProvider({ children }: ProviderProps) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
  });

  const userState = { user, setUser };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
