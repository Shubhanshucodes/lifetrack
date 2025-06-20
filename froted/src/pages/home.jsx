// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import '../index.css'


const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const Card = ({ title, description }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform"
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans">
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-blue-600">LifeOnTrack</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
          {darkMode ? "☀️" : "🌙"}
        </button>
      </nav>

      <section className="px-6 py-10 text-center">
        <p className="text-lg mb-4 flex items-center justify-center gap-2">
          It just takes a
          <img
            src="../src/assets/fef8830173b042d0a5e4fad025780433-free.png"
            alt="logo"
            className="h-8 w-8"
          />
          to get your life on track
        </p>
        <motion.h1
          className="text-4xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Complete. Grow. Earn.
        </motion.h1>
        <img
          src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop"
          alt="Inspiration"
          className="w-full max-w-4xl mx-auto rounded-xl shadow-xl"
        />
      </section>

      <section className="px-6 py-10">
        <motion.h2
          className="text-3xl font-semibold mb-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Complete, Grow and Earn
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="DAILY TASKS" description="One step at a time. Complete this challenge to get one percent better every day." />
          <Card title="BE CONSISTENT." description="Consistency is the key. Complete the daily task for seven consecutive days to become eligible for the epic 21 days challenge." />
          <Card title="21 DAYS CHALLENGE." description="Bet on yourself. Take this challenge and get a chance to earn money for your consistency." />
        </div>
      </section>

      <section className="px-6 py-10 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
        <motion.h2
          className="text-3xl font-semibold mb-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Better Together
        </motion.h2>
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-2">Join the community.</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Connect with people like you and get better together.
          </p>
          <div className="flex justify-center gap-4">
            <img src="https://th.bing.com/th/id/OIP.T9ZPb8sSn0yieVGewIj9JwAAAA?w=474&h=446&rs=1&pid=ImgDetMain" className="w-8 h-8 rounded-full" alt="Insta" />
            <img src="https://th.bing.com/th/id/OIP.rPP1z7xLAEQk0aCO-cPudAHaHa?rs=1&pid=ImgDetMain" className="w-8 h-8 rounded-full" alt="Discord" />
            <img src="https://static.vecteezy.com/system/resources/previews/031/737/215/large_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png" className="w-8 h-8 rounded-full" alt="Twitter" />
          </div>
        </motion.div>
      </section>

      <footer className="bg-white dark:bg-gray-800 py-4 mt-10 text-center">
        <p className="text-gray-600 dark:text-gray-400">&copy; {new Date().getFullYear()} LifeOnTrack. All rights reserved.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Get your life on track.</p>
      </footer>
    </div>
  );
};

export default Home;
