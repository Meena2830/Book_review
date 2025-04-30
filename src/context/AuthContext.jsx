import React, { createContext, useContext, useState } from 'react';


const safeParseJSON = (value) => {
  try {
    if (value === 'undefined' || value === null) {
      return null; 
    }
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (e) {
    console.error('Error parsing user data from sessionStorage:', e);
    return null;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const storedToken = sessionStorage.getItem('token') || '';
  const storedUser = sessionStorage.getItem('user');
  
  
  const parsedUser = storedUser ? safeParseJSON(storedUser) : null;

  
  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(parsedUser);

  const login = (token, user) => {
   
    if (!user) {
      console.error('User data is missing!');
      return;
    }

    
    const normalizedUser = { ...user, role: user.role?.toUpperCase() };
    console.log('Login user received:', normalizedUser); 

    
    sessionStorage.setItem('token', String(token));
    sessionStorage.setItem('user', JSON.stringify(normalizedUser));

    
    console.log('Stored user in sessionStorage:', sessionStorage.getItem('user'));

    
    setToken(token);
    setUser(normalizedUser);
  };

  const logout = () => {
    
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
