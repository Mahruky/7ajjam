
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Clock, MapPin, Users, Trash2 } from "lucide-react";

function BarberDashboard() {
  const { currentBarber } = useAuth();
  const [activeTab, setActiveTab] = useState("availability");
  const [availability, setAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
    location: ""
  });

  useEffect(() => {
    // Load availability and bookings from localStorage
    const savedAvailability = JSON.parse(localStorage.getItem("availability") || "[]")
      .filter(slot => slot.barberId === currentBarber.id);
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      .filter(booking => booking.barberId === currentBarber.id);
    
    setAvailability(savedAvailability);
    setBookings(savedBookings);
  }, [currentBarber.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSlotWithId = { 
      ...newSlot, 
      id: Date.now(),
      barberId: currentBarber.id 
    };
    
    const updatedAvailability = [...availability, newSlotWithId];
    setAvailability(updatedAvailability);
    localStorage.setItem("availability", JSON.stringify(updatedAvailability));
    
    setNewSlot({
      date: "",
      startTime: "",
      endTime: "",
      location: ""
    });

    toast({
      title: "Availability Added",
      description: "Your new availability slot has been saved.",
    });
  };

  const handleDelete = (id) => {
    const updatedAvailability = availability.filter(slot => slot.id !== id);
    setAvailability(updatedAvailability);
    localStorage.setItem("availability", JSON.stringify(updatedAvailability));
    
    toast({
      title: "Slot Removed",
      description: "The availability slot has been removed.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-8"
    >
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{currentBarber.name}</h1>
            <p className="text-slate-600">{currentBarber.specialties}</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "availability"
              ? "border-b-2 border-primary text-primary"
              : "text-slate-600"
          }`}
          onClick={() => setActiveTab("availability")}
        >
          Availability
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "bookings"
              ? "border-b-2 border-primary text-primary"
              : "text-slate-600"
          }`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
      </div>

      {activeTab === "availability" ? (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Add New Availability</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    <Calendar className="w-4 h-4 inline-block mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={newSlot.date}
                    onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      <Clock className="w-4 h-4 inline-block mr-2" />
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      <Clock className="w-4 h-4 inline-block mr-2" />
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                      className="w-full px-4 py-2 border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    <MapPin className="w-4 h-4 inline-block mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={newSlot.location}
                    onChange={(e) => setNewSlot({ ...newSlot, location: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Availability
                </Button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Current Availability</h2>
              <div className="space-y-4">
                {availability.length === 0 ? (
                  <p className="text-center text-slate-600 py-4">
                    No availability slots added yet
                  </p>
                ) : (
                  availability.map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-slate-50 p-4 rounded-lg flex justify-between items-center"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center text-primary">
                          <Calendar className="w-4 h-4 mr-2" />
                          <p className="font-medium">{slot.date}</p>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <Clock className="w-4 h-4 mr-2" />
                          <p className="text-sm">
                            {slot.startTime} - {slot.endTime}
                          </p>
                        </div>
                        <div className="flex items-center text-slate-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          <p className="text-sm">{slot.location}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(slot.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <p className="text-center text-slate-600 py-4">
                No bookings yet
              </p>
            ) : (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-slate-50 p-4 rounded-lg"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="font-medium">{booking.customer.name}</p>
                      <p className="text-sm text-slate-600">
                        {booking.customer.phone}
                      </p>
                      <p className="text-sm text-slate-600">
                        {booking.customer.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{booking.slot.date}</p>
                      <p className="text-sm text-slate-600">
                        {booking.slot.startTime} - {booking.slot.endTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default BarberDashboard;
