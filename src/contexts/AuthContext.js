import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const signIn = async (phone, password) => {
    try {
      const response = await fetch('https://testdeploy.up.railway.app/api/v1/auth/log-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPhoneNumber: phone,
          userPassword: password,
        }),
      });

      const data = await response.json();
      if (response.ok && data.code === 200) {
        const user = {
          phone: data.data.userPhoneNumber,
          jwtToken: data.data.jwtToken,
          fullName: data.data.userFullName,
          address: data.data.userAddress,
          dateOfBirth: data.data.userDateOfBirth,
          id: data.data.idUser,
        };

        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      return false;
    }
  };

  const signUp = async (phone, password) => {

  };

  const signOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const setUser = (data) =>{
    const user = {
      phone: data.userPhoneNumber,
      jwtToken: data.jwtToken,
      fullName: data.userFullName,
      address: data.userAddress,
      dateOfBirth: data.userDateOfBirth,
      id: data.idUser,
    };
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ currentUser, setUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
