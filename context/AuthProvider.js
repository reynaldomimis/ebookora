import { createContext, useContext, useState, useEffect } from "react";
import { getAccount } from "../lib/appwrite";
import { useRouter } from "expo-router";

// Create AuthContext
const AuthContext = createContext();

// Export useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// Export AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      const currentUser = await getAccount();
      if (currentUser) {
        setUser(currentUser);
        setIsLogged(true);
        router.replace("/home");
      } else {
        setUser(null);
        setIsLogged(false);
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
