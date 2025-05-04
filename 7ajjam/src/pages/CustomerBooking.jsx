
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

function CustomerBooking() {
  const { barberId } = useParams();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: ""
  });

  useEffect(() => {
    // Load availability from localStorage
    const availability = JSON.parse(localStorage.getItem("availability") || "[]");
    setAvailableSlots(availability);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      toast({
        title: "Error",
        description: "Please select an available time slot.",
        variant: "destructive"
      });
      return;
    }

    // Store booking in localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now(),
      slot: selectedSlot,
      customer: customerInfo,
      barberId
    };
    
    localStorage.setItem("bookings", JSON.stringify([...bookings, newBooking]));
    
    toast({
      title: "Booking Confirmed",
      description: "Your appointment has been successfully booked.",
    });

    // Reset form
    setSelectedSlot(null);
    setCustomerInfo({
      name: "",
      phone: "",
      email: ""
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Book Your Appointment</h1>
        <p className="text-slate-600">Select your preferred time and date</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Available Slots</h2>
          <div className="space-y-4">
            {availableSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                className={`w-full p-4 rounded-lg text-left transition ${
                  selectedSlot?.id === slot.id
                    ? "bg-primary text-white"
                    : "bg-white hover:bg-slate-50"
                }`}
              >
                <p className="font-medium">{slot.date}</p>
                <p className="text-sm opacity-90">
                  {slot.startTime} - {slot.endTime}
                </p>
                <p className="text-sm opacity-90">{slot.location}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Information</h2>
          <form onSubmit={handleBooking} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "phone", label: "Phone Number", type: "tel" },
              { name: "email", label: "Email", type: "email" }
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={customerInfo[field.name]}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      [field.name]: e.target.value
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            ))}

            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default CustomerBooking;
