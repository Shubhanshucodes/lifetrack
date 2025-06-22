// src/pages/Home.jsx
import React, { useState, useEffect } from "react"; 
import { motion } from "framer-motion";
import '../index.css'
import Logo from "../compomemts/logo";


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
 


  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen font-sans">
      <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800">
        
      </nav>

     <section className="relative px-6 py-16 text-center overflow-hidden bg-white dark:bg-gray-900">
  <div className="relative z-10 max-w-3xl mx-auto">
    <p className="text-lg font-medium flex justify-center items-center gap-2 mb-4 text-gray-700 dark:text-gray-300">
      It just takes a
      <Logo/>
      to get your life on track
    </p>

    <motion.h1
      className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-white"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      Build Habits. <br />
      Master Consistency. <br />
      Earn With Discipline.
    </motion.h1>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.location.href = "/signup"}
      className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
    >
      🚀 Get Started
    </motion.button>
  </div>

  <img
    src="https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=1128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt="Motivation"
    className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
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
          <Card title="ANALYSE AND IMPROVE." description="Identify the areas where you can improve your speaking. Strengthen your communication skills to express your thoughts clearly and confidently." />
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
      <section className="px-6 py-14 bg-white dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">🚀 How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Step 1: Show Up Daily</h3>
            <p className="text-gray-600 dark:text-gray-300">Log in, take your challenge, and start your journey one task at a time.</p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Step 2: Track Progress</h3>
            <p className="text-gray-600 dark:text-gray-300">Stay consistent, monitor your streaks, and unlock new levels.</p>
          </div>
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Step 3: Earn & Inspire</h3>
            <p className="text-gray-600 dark:text-gray-300">Win rewards and become someone others look up to.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">💬 What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-left">
            <p className="text-gray-700 dark:text-gray-300">"I never thought a simple daily habit could change so much. LifeOnTrack helped me build consistency and clarity."</p>
            <p className="mt-4 font-semibold text-blue-700 dark:text-blue-300">– Aditi, Content Creator</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-left">
            <p className="text-gray-700 dark:text-gray-300">"From zero motivation to a 21-day streak. This app holds me accountable in the most inspiring way."</p>
            <p className="mt-4 font-semibold text-blue-700 dark:text-blue-300">– Rohit, College Student</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-left">
            <p className="text-gray-700 dark:text-gray-300">"Loved how I could track, reflect, and earn — all in one place. Super smooth experience."</p>
            <p className="mt-4 font-semibold text-blue-700 dark:text-blue-300">– Sarah, Freelancer</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 bg-gray-50 dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">✨ One Habit Away</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">You are one routine away from a whole new version of you. Ready to commit?</p>
        <a href="/signup" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition">
          Get Started Now
        </a>
      </section>
      <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 mt-16 pt-10 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-38">

          {/* Brand / About */}
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-3">LifeOnTrack</h3>
            <p className="text-sm">
              Your daily companion for building habits, tracking progress, and staying consistent. One day at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="/profile" className="hover:text-blue-600 transition">Profile</a></li>
              <li><a href="/challenge" className="hover:text-blue-600 transition">21-Day Challenge</a></li>
              <li><a href="/dailytask" className="hover:text-blue-600 transition">Daily Task</a></li>
              <li><a href="/signup" className="hover:text-blue-600 transition">Join Us</a></li>
            </ul>
          </div>

         {/* Community */}
<div>
  <h4 className="text-lg font-semibold mb-2">Community</h4>
  <ul className="space-y-1 text-sm text-gray-400 dark:text-gray-500">
    <li className="cursor-not-allowed">Instagram (Coming Soon)</li>
    <li className="cursor-not-allowed">Discord (Coming Soon)</li>
    <li className="cursor-not-allowed">Twitter (Coming Soon)</li>
    <li className="cursor-not-allowed">Telegram (Coming Soon)</li>
  </ul>
</div>

          {/* Newsletter */}
         
          

        </div>

        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} LifeOnTrack. All rights reserved. | Built for the consistent.
        </div>
      </footer>




    </div>
  );
};

export default Home;
