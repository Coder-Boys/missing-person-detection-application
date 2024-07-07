import Component from "@/components/Navbar";
import React from "react";
import Hero from "./Hero";
import About from "./About";
import Statistics from "./Statistics";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Statistics />

      <Footer />
    </div>
  );
};

export default HomePage;
