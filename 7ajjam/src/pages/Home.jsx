
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Book Your Perfect Haircut
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 max-w-2xl mx-auto"
        >
          Find and book appointments with the best barbers in your area
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/book">
            <Button size="lg" className="text-lg px-8">
              Book Now
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <MapPin className="h-8 w-8" />,
            title: "Find Nearby",
            description: "Discover top-rated barbers in your area"
          },
          {
            icon: <Calendar className="h-8 w-8" />,
            title: "Easy Booking",
            description: "Book your appointment with just a few clicks"
          },
          {
            icon: <Clock className="h-8 w-8" />,
            title: "Real-time Availability",
            description: "See available time slots instantly"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-sm text-center space-y-4"
          >
            <div className="text-primary mx-auto w-fit">{feature.icon}</div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-slate-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      <section className="text-center space-y-8">
        <h2 className="text-3xl font-bold">Featured Barbers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((barber) => (
            <div key={barber} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
                <img  alt={`Barber ${barber}`} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1637332759216-ff98579065a8" />
              </div>
              <h3 className="text-xl font-semibold">Professional Barber {barber}</h3>
              <p className="text-slate-600">Experienced in modern and classic cuts</p>
              <Button variant="outline" className="w-full">View Profile</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
