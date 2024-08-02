import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Simulate checking for an authenticated user on mount
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const signIn = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { email };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve();
      }, 1000);
    });
  };

  const signUp = (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { email };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve();
      }, 1000);
    });
  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
