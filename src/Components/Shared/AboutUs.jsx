// src/Pages/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Rocket } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full card shadow-2xl bg-base-100 p-10 rounded-2xl"
      >
        {/* Heading */}
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          About Us
        </motion.h1>

        {/* Intro Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg leading-relaxed text-justify mb-6"
        >
          Welcome to <span className="font-bold text-primary">Job Finder</span>, 
          a MERN stack-powered platform designed to bridge the gap between job seekers 
          and employers. Our mission is to provide a seamless and secure environment 
          for candidates to discover opportunities and recruiters to find the right talent.
        </motion.p>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 my-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card bg-base-200 shadow-md p-6 flex flex-col items-center text-center"
          >
            <Briefcase size={40} className="text-primary mb-3" />
            <h3 className="font-bold text-xl mb-2">For Recruiters</h3>
            <p>
              Post jobs, manage applicants, and find top talent with ease.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card bg-base-200 shadow-md p-6 flex flex-col items-center text-center"
          >
            <Users size={40} className="text-secondary mb-3" />
            <h3 className="font-bold text-xl mb-2">For Candidates</h3>
            <p>
              Discover opportunities, apply for jobs, and track your applications.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card bg-base-200 shadow-md p-6 flex flex-col items-center text-center"
          >
            <Rocket size={40} className="text-accent mb-3" />
            <h3 className="font-bold text-xl mb-2">Our Vision</h3>
            <p>
              Build a scalable, innovative job portal that empowers careers. 🚀
            </p>
          </motion.div>
        </div>

        {/* Closing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg leading-relaxed text-justify"
        >
          With features such as role-based authentication, dynamic job postings, 
          application tracking, and admin management, 
          <span className="font-semibold"> Job Finder </span> ensures every user 
          gets the best experience possible.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AboutUs;
