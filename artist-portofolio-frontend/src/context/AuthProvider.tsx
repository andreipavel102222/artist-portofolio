import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  const login = async (userData: {email: string,password: string,}, errorHandler: (message: string) => void) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const res = await response.json();
      console.log(res);
      if (res.accessToken) {
        console.log('aaa');
        setToken(res.accessToken);
        localStorage.setItem("token", res.accessToken);
        navigate('/');
        return;
      }
      throw new Error(res.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      errorHandler(err.message);
    }
  }
  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/login');
  }

  return <AuthContext.Provider value={{token, login, logout}}>{children}</AuthContext.Provider>
}

export default AuthProvider;
