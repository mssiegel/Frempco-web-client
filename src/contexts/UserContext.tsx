import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

type UserCtxType = {
  userInfo: { name: string };
  setUserInfo: Dispatch<SetStateAction<{ name: string }>>;
};

const UserContext = createContext<UserCtxType>({
  userInfo: { name: '' },
  setUserInfo: () => {},
});

function UserProvider({ children }: ProviderProps) {
  const [userInfo, setUserInfo] = useState({
    name: '',
  });

  const userState = { userInfo, setUserInfo };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
