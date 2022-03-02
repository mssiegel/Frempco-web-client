import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

type UserCtxType = {
  userInfo: { studentName: string };
  setUserInfo: Dispatch<SetStateAction<{ studentName: string }>>;
};

const UserContext = createContext<UserCtxType>({
  userInfo: { studentName: '' },
  setUserInfo: () => {},
});

function UserProvider({ children }: ProviderProps) {
  const [userInfo, setUserInfo] = useState({
    studentName: '',
  });

  const userState = { userInfo, setUserInfo };

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
