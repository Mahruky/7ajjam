
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Scissors, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

function Navbar() {
  const { currentBarber, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">7ajjem</span>
          </Link>
          <div className="flex items-center space-x-4">
            {currentBarber ? (
              <>
                <span className="text-sm text-slate-600">
                  Welcome, {currentBarber.name}
                </span>
                <Link to="/barber/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/barber/register">
                  <Button variant="outline">Barber Sign Up</Button>
                </Link>
                <Link to="/barber/login">
                  <Button>Barber Login</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
