import React, { createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<boolean>(
    Boolean(localStorage.getItem("user"))
  );
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    if (email === "admin@example.com" && password === "password123") {
      localStorage.setItem("user", "true");
      setUser(true);

      navigate("/", { replace: true });
      window.history.pushState(null, "", "/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    window.history.pushState(null, "", "/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
