import { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
  name: "",
  mobile: "",
  email: "",
  requirement: "",
  budget: "",
  timeline: "",
});
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("https://nexora-zq5s.onrender.com/api/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service: selectedService }),
      });

      alert("Request submitted successfully!");
      setShowForm(false);
      setSelectedService("");
      setFormData({ name: "", mobile: "", email: "", requirement: "" });
    } catch (error) {
      alert("Error submitting form");
    }
  };

  const renderServiceOptions = () => {
    if (selectedService === "Web Development") {
      return (
        <select
          name="requirement"
          value={formData.requirement}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        >
          <option value="">Select your need</option>
          <option>Business Website</option>
          <option>E-commerce Website</option>
          <option>Portfolio Website</option>
          <option>Web Application (Dashboard / SaaS)</option>
          <option>Website Redesign</option>
        </select>
      );
    }

    if (selectedService === "Digital Marketing") {
      return (
        <select
          name="requirement"
          value={formData.requirement}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        >
          <option value="">Select your marketing goal</option>
          <option>SEO Optimization</option>
          <option>Social Media Management</option>
          <option>Google Ads / Paid Campaigns</option>
          <option>Brand Strategy</option>
          <option>Content Marketing</option>
        </select>
      );
    }

    if (selectedService === "Custom Coding") {
      return (
        <select
          name="requirement"
          value={formData.requirement}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          required
        >
          <option value="">Select coding requirement</option>
          <option>Automation Script</option>
          <option>Custom Software</option>
          <option>API Development</option>
          <option>Full Stack Application</option>
          <option>System Integration</option>
        </select>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold tracking-wide">Nexora</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-white text-indigo-900 px-6 py-2 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
        >
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Elevate Your Digital Presence
        </motion.h2>
        <p className="max-w-2xl mx-auto text-lg opacity-90 mb-8">
          Choose your service and let Nexora build a solution tailored exactly for your business needs.
        </p>
      </section>

      {/* Services */}
      <section className="bg-white text-gray-900 py-16 px-8">
        <h3 className="text-3xl font-bold text-center mb-12">Choose Your Service</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Web Development", "Digital Marketing", "Custom Coding"].map(
            (service) => (
              <div
                key={service}
                onClick={() => {
                  setSelectedService(service);
                  setShowForm(true);
                }}
                className="cursor-pointer p-8 rounded-3xl shadow-2xl hover:scale-105 transition bg-gradient-to-br from-indigo-100 to-purple-100"
              >
                <h4 className="text-xl font-semibold mb-4">{service}</h4>
                <p>Click to explore how we can help you.</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white text-gray-900 p-8 rounded-3xl w-96 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center">
              {selectedService || "General Inquiry"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              />

              {/* Budget Selection */}
              <select
               name="budget"
               value={formData.budget}
               onChange={handleChange}
               required
               className="w-full p-3 border rounded-xl"
              >
              <option value="">Select Budget</option>
              <option>₹10k - ₹25k</option>
              <option>₹25k - ₹50k</option>
              <option>₹50k+</option>
              </select>

              {/* Timeline Selection */}
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl"
              >
              <option value="">Select Timeline</option>
              <option>Urgent (1–2 weeks)</option>
              <option>1 Month</option>
              <option>Flexible</option>
              </select>

              {renderServiceOptions()}
              <button
                type="submit"
                className="w-full bg-indigo-900 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full text-sm mt-2 text-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-6 bg-black bg-opacity-30">
        <p className="text-sm">© {new Date().getFullYear()} Nexora. All rights reserved.</p>
      </footer>
    </div>
  );
}
