
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentBarber, setCurrentBarber] = useState(null);
  
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("barberAuth") || "null");
    if (auth) {
      setCurrentBarber(auth);
    }
  }, []);

  const login = (email, password) => {
    const barbers = JSON.parse(localStorage.getItem("barbers") || "[]");
    const barber = barbers.find(b => b.email === email);
    
    if (!barber) {
      throw new Error("Barber not found");
    }
    
    // In a real app, you would hash passwords and compare them properly
    localStorage.setItem("barberAuth", JSON.stringify(barber));
    setCurrentBarber(barber);
  };

  const logout = () => {
    localStorage.removeItem("barberAuth");
    setCurrentBarber(null);
  };

  return (
    <AuthContext.Provider value={{ currentBarber, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
