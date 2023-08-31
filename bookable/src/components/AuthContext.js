import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/signup', {
        user: userData,
      });
      if (response.data.message === 'Signed up successfully') {
        const { token, user } = response.data; // Assuming API returns user details
        setUser({ token, ...user });
      }
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};