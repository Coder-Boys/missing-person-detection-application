import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Volunteers = () => {
  return (
    <div className="my-32 px-5" style={{ backgroundImage: `url(/v.jpg)`}}>
    <div className="flex justify-between p-8">
    <div>
     <h1 className="text-lg font-bold my-8">MEET OUR TEAM</h1>
     <h1 className="text-4xl lg:text-7xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[rgb(99,102,241)] to-[rgb(156,39,176)] font-bold space-y-5">Volunteers <br /> Around <br /> The Globe</h1>
     </div>
    <div>
    <Button className="bg-my-gradient">Meet Our Team <FaArrowRight /> </Button>
     </div>
    </div>
    </div>
  );
};

export default Volunteers;
