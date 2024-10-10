// UserContext.tsx
import React, { createContext, useState, useContext } from 'react';
import { UserCTXType } from '../types/bookingNUser';

interface UserContextType {
  userCTX: UserCTXType | null;
  setUserCTX: (userCTX: UserCTXType | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userCTX, setUserCTX] = useState<UserCTXType | null>(null);

  return (
    <UserContext.Provider
      value={{ userCTX, setUserCTX }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
