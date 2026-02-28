import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

type UserCtxType = {
  user: { isLoggedIn: boolean };
  setUser: Dispatch<SetStateAction<{ isLoggedIn?: boolean }>>;
};

const UserContext = createContext<UserCtxType>({
  user: { isLoggedIn: false },
  setUser: () => {},
});

function UserProvider({ children }: ProviderProps) {
  const [user, setUser] = useState({
    isLoggedIn: false,
  });

  const userState = { user, setUser };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
