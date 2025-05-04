
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

function BarberRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    experience: "",
    specialties: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    const barbers = JSON.parse(localStorage.getItem("barbers") || "[]");
    
    if (barbers.some(b => b.email === formData.email)) {
      toast({
        title: "Error",
        description: "Email already registered",
        variant: "destructive"
      });
      return;
    }

    const newBarber = { 
      ...formData, 
      id: Date.now(),
      // Remove confirmPassword from stored data
      confirmPassword: undefined
    };
    
    localStorage.setItem("barbers", JSON.stringify([...barbers, newBarber]));
    
    toast({
      title: "Registration Successful",
      description: "Your barber profile has been created. Please login.",
    });

    navigate("/barber/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Barber Registration</h1>
        <p className="text-slate-600">Join our platform and grow your business</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
        {[
          { name: "name", label: "Full Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
          { name: "confirmPassword", label: "Confirm Password", type: "password" },
          { name: "phone", label: "Phone Number", type: "tel" },
          { name: "location", label: "Location", type: "text" },
          { name: "experience", label: "Years of Experience", type: "number" },
          { name: "specialties", label: "Specialties", type: "text" }
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
        ))}
        
        <Button type="submit" className="w-full">
          Register as Barber
        </Button>
      </form>
    </motion.div>
  );
}

export default BarberRegistration;
