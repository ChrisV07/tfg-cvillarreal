"use client";

import React, { createContext, useContext, ReactNode } from 'react';

interface User {
  role: string;
  restaurantID?: string | null;
}

interface Session {
  user: User;
}

const SessionContext = createContext<Session | null>(null);

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider: React.FC<{ session: Session, children: ReactNode }> = ({ session, children }) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};