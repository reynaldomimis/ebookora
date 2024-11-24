import { createContext, useContext, useState } from "react";

//Create AuthContext
const AuthContext = createContext();

//Export useAuth hooks
export const useAuth = () => {
  return useContext(AuthContext);
};

//Export AuthProvider components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  return (
    <AuthContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
