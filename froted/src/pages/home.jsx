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
                    Write. Compete. Grow.
                </motion.h1>
                <p className="hero-text">
                    Join a vibrant community of writers. Learn new skills, join contests, and improve your craft.
                </p>
                <img
                    src="https://plus.unsplash.com/premium_photo-1684444605542-93725082d214?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d3JpdGVyc3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="Writing Inspiration"
                    className="hero-image"
                    loading="lazy"
                />
            </section>

            <section className="section">
                <motion.h2 className="section-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    Compete and Grow
                </motion.h2>
                <div className="card-grid">
                    <Card title="Lyrics Writing" description="Master the art of writing impactful and emotional lyrics." />
                    <Card title="Poetry Writing" description="Explore rhythm, structure, and imagination in your poems." />
                    <Card title="Screenplay Writing" description="Craft compelling scripts for film and television." />
                </div>
            </section>

            <section className="section contest-section">
                <motion.h2 className="section-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
                    Upcoming Contest
                </motion.h2>
                <motion.div
                    className="contest-card"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h3>Sunday Writing Challenge</h3>
                    <p>
                        Participate this Sunday and stand a chance to win prizes, feedback and recognition.
                    </p>
                </motion.div>
            </section>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} WritersHub. All rights reserved.</p>
                <p className="footer-text">Follow your passion, elevate your words.</p>
            </footer>
        </div>
    );
};

export default Home;
