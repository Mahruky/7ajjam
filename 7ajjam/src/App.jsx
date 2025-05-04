
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import BarberRegistration from "@/pages/BarberRegistration";
import BarberDashboard from "@/pages/BarberDashboard";
import CustomerBooking from "@/pages/CustomerBooking";
import BarberLogin from "@/pages/BarberLogin";
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/barber/register" element={<BarberRegistration />} />
              <Route path="/barber/login" element={<BarberLogin />} />
              <Route 
                path="/barber/dashboard" 
                element={
                  <ProtectedRoute>
                    <BarberDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/book/:barberId" element={<CustomerBooking />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("barberAuth") || "null");
  
  if (!isAuthenticated) {
    return <Navigate to="/barber/login" replace />;
  }
  
  return children;
}

export default App;
