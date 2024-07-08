import Image from "next/image";
import React from "react";
import kidsImage from "@/public/kids.jpg";
import { FaFlagCheckered } from "react-icons/fa";

const About = () => {
  return (
    <div className="my-6 mx-3">
      <h1 className="text-4xl font-bold my-8 uppercase text-center">
        About Us
      </h1>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <Image
            className="object-cover rounded-sm shadow-lg shadow-[rgb(156,39,176)]/60"
            alt=""
            src={kidsImage}
          />
        </div>
        <div className="flex flex-col mx-10">
          <h1 className="font-bold text-4xl  tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] drop-shadow-2xl my-5 mb-12">
            {" "}
            Tracing missing people and identifying unidentifiable ones
          </h1>
          <h1 className=" text-gray-400 ">
            Our Missing Person Detection application leverages advanced AI and
            machine learning to locate missing individuals swiftly and
            accurately. By integrating with law enforcement databases and public
            alerts, we provide real-time updates and actionable insights. Our
            user-friendly interface ensures accessibility for all users,
            enabling communities to contribute effectively. Join us in making a
            difference and reuniting families through innovative technology.
            Together, we can bring hope and find the missing.
          </h1>
          <div className="my-7 space-y-2">
            <p className="flex gap-2">
              <FaFlagCheckered color="violet" size={25} /> Our Mission Be a helping hand to facilitate.
            </p>
            <p className="flex gap-2">
              <FaFlagCheckered color="violet" size={25} /> Our vision is to Change and empower
              people&apos;s lives.
            </p>
            <p className="flex gap-2">
              <FaFlagCheckered color="violet" size={25} /> Our goal is to find the missing ones and back
              them to their family.
            </p>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default About;
