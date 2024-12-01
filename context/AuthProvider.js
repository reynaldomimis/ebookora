import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { router, useNavigation } from "expo-router";

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
  const navigation = useNavigation();

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
          console.log("User after settingss:", res);
          router.push("/home");
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLogged, setIsLogged, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
