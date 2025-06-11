// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../CssFiles/home.css";

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
        className="card"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
    >
        <h3>{title}</h3>
        <p>{description}</p>
    </motion.div>
);

const Home = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
    }, [darkMode]);

    return (
        <div className="home-container">
            <nav className="navbar">
                <h1>LifeOnTrack</h1>
                <button className="toggle-button" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? "☀️" : "🌙"}
                </button>
            </nav>

            <section className="hero-section">
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                     Complete. Grow. Earn.
                </motion.h1>
                <p className="hero-text">
                    It just takes a LOT to get your life on track.
                </p>
                <img
                    src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Writing Inspiration"
                    className="hero-image"
                    loading="lazy"
                />
            </section>

            <section className="section">
                <motion.h2 className="section-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    Complete, Grow and Earn
                </motion.h2>
                <div className="card-grid">
                    <Card title="DAILY TASKS" description="One step at a time. Complete this challenge to get one percent better every day." />
                    <Card title="BE CONSISTENT." description="Consistency is the key. Complete the daily task for seven consecutive days to become eligible for the epic 21 days challenge." />
                    <Card title="21 DAYS CHALLENGE." description="Bet on yourself. Take this challenge and get a chance to earn money for your consistency." />
                </div>
            </section>

            <section className="section contest-section">
                <motion.h2 className="section-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    Better Together
                </motion.h2>
                <motion.div
                    className="contest-card"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h3>Join the community.</h3>
                    <p>
                        Connect with people like you and get better together. <br/> <br/>
                        <div className="icodiv">
                        <img src="https://th.bing.com/th/id/OIP.T9ZPb8sSn0yieVGewIj9JwAAAA?w=474&h=446&rs=1&pid=ImgDetMain"  alt="insta"></img>
                        <img src="https://th.bing.com/th/id/OIP.rPP1z7xLAEQk0aCO-cPudAHaHa?rs=1&pid=ImgDetMain" alt="dicord"></img>
                        <img src="https://static.vecteezy.com/system/resources/previews/031/737/215/large_2x/twitter-new-logo-twitter-icons-new-twitter-logo-x-2023-x-social-media-icon-free-png.png" alt="twt"></img>
                   </div>
                    </p>
                
                </motion.div>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} LifeOnTrack. All rights reserved.</p>
                <p className="footer-text">Get your life on track.</p>
            </footer>
        </div>
    );
};

export default Home;
