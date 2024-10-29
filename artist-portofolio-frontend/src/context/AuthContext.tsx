import { createContext } from "react";


interface AuthContextType {
  token: string | null;
  login: (  userData: {email: string,password: string}, errorHandler: (message: string) => void) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({token: null, login: () => {}, logout: () => {}});