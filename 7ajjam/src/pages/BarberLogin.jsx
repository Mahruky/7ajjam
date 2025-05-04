
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

function BarberLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate("/barber/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Barber Login</h1>
        <p className="text-slate-600">Welcome back! Please login to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </motion.div>
  );
}

export default BarberLogin;
