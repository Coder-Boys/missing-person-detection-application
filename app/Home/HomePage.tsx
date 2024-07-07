import Component from "@/components/Navbar";
import React from "react";
import Hero from "./Hero";
import About from "./About";
import Statistics from "./Statistics";
import Footer from "./Footer";
import Volunteers from "./Volunteers";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Statistics />
      <Volunteers />
      <Footer />
    </div>
  );
};

export default HomePage;
